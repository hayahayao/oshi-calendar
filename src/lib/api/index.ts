export const checkEnvironment = () => {
  let base_url =
    process.env.NODE_ENV === 'development'
      ? 'http://localhost:3000'
      : 'https://example.com'

  return base_url
}

export const getPlaylistData = async () => {
  try {
    const response = await fetch(
      checkEnvironment().concat('/api/getPlaylistData')
    )
    console.log('getPlaylistData', response)
    return response
  } catch (e) {
    console.error('!!!!', e)
  }
}
