const API = 'http://localhost:3333/api';

export const getChannelDataRequest = async (
  apiKey: string,
  forUserName: string,
) => {
  try {
    const params = new URLSearchParams({
      apiKey,
      forUserName,
    });
    const response = await fetch(`${API}/channel?${params.toString()}`);

    if (!response.ok) {
      throw new Error('Failed to get channel data');
    }

    return await response.json();
  } catch (e) {
    console.error(e);
    alert('Failed to get channel data');
  }
};

export const getPlaylistItemsReuqest = async (
  channelId: string,
  apiKey: string,
  nextPageToken?: string,
) => {
  try {
    const params = new URLSearchParams({ apiKey });

    if (nextPageToken) {
      params.append('nextPageToken', nextPageToken);
    }

    const response = await fetch(`${API}/playlists/${channelId}?${params.toString()}`);

    if (!response.ok) {
      throw new Error('Failed to get playlist data');
    }

    return await response.json();
  } catch (e) {
    console.error(e);
    alert('Failed to get channel data');
  }
};