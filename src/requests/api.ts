export const likeRoom = async (
  roomId: number,
  email: string
): Promise<Response> => {
  const response = await fetch('/api/like', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      roomId,
      email,
    }),
  });

  return response;
};

export const unlikeRoom = async (likeId: number): Promise<Response> => {
  const response = await fetch('/api/unlike', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      likeId,
    }),
  });

  return response;
};
