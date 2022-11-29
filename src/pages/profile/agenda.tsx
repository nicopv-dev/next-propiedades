import MainLayout from '../../layouts/MainLayout';
import ProfileLayout from '../../layouts/ProfileLayout';
import { Calendar, momentLocalizer } from 'react-big-calendar';
import moment from 'moment';
import { getSession } from 'next-auth/react';
import Schedule from '../../interfaces/Schedule';
import Loading from '../../components/Loading';
import { GetServerSidePropsContext } from 'next';

const localizer = momentLocalizer(moment);

interface IAgendaProps {
  schedules: Schedule[];
  error: boolean;
}

function Agenda({ schedules, error }: IAgendaProps) {
  return (
    <MainLayout title="Mi Agenda">
      <ProfileLayout>
        <div>
          {error ? (
            <Loading />
          ) : (
            <Calendar
              localizer={localizer}
              events={schedules}
              startAccessor="start"
              endAccessor="end"
              style={{ height: 500 }}
            />
          )}
        </div>
      </ProfileLayout>
    </MainLayout>
  );
}

export default Agenda;

export const getServerSideProps = async (ctx: GetServerSidePropsContext) => {
  const session = await getSession(ctx);

  if (!session) {
    return {
      redirect: {
        destination: '/',
      },
    };
  }

  const user = await prisma.user.findUnique({
    where: {
      email: session ? (session?.user?.email as string) : '',
    },
  });

  const schedules = await prisma.schedule.findMany({
    where: {
      room: {
        authorId: user.id,
      },
    },
    include: {
      room: {
        select: {
          id: true,
          title: true,
        },
      },
      user: {
        select: {
          id: true,
          name: true,
        },
      },
    },
  });

  const result = schedules.map((schedule) => {
    return {
      ...schedule,
      start: schedule.date,
      end: schedule.date,
      title: `${schedule.user.name} / ${schedule.room.title}`,
      allDay: true,
    };
  });

  return {
    props: {
      error: false,
      schedules: JSON.parse(JSON.stringify(result)),
    },
  };
};
