const fetch = async (
  userId: string,
  movieId: number,
  isFavorite: boolean
): Promise<ResponseStatusData> => {
  const { account, favorite } = resources;
  const url = `${account}/${userId}/${favorite}`;
  const data = { media_type: 'movie', media_id: movieId, favorite: isFavorite };

  const config: Config = {
    method: 'POST',
    url,
    data,
  };

  return fetchData<ResponseStatusData>(config);
};

export default fetchFavoriteMovie;
