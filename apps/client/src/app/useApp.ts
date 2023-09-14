import { useState, useEffect } from 'react';
import { getChannelDataRequest, getPlaylistItemsReuqest } from '../api';

export const useApp = () => {
  const [apiKey, setApiKey] = useState('');
  const [channelName, setChannelName] = useState('');
  const [statistics, setStatistics] = useState();
  const [avatar, setAvatar] = useState();
  const [channelId, setChannelId] = useState();
  const [nextPageToken, setNextPageToken] = useState();
  const [videos, setVideos] = useState([]);
  const [hasMore, setHasMore] = useState(true);

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [channelId]);

  const handleChangeApiKey = (e: React.ChangeEvent<HTMLInputElement>) => {
    setApiKey(e.target.value);
  };

  const handleChangeChannelName = (e: React.ChangeEvent<HTMLInputElement>) => {
    setChannelName(e.target.value);
  };

  const handleNext = async () => {
    if (!apiKey || !channelName) {
      alert('API key and Channel Name are required');
    }

    const data = await getChannelDataRequest(apiKey, channelName);

    if (data) {
      setStatistics(data.statistics);
      setAvatar(data.avatar);
      setChannelId(data.channelId);
    }
  };

  const handleLoadVideos = async () => {
    if (!channelId) {
      return;
    }
    
    const data = await getPlaylistItemsReuqest(channelId, apiKey, nextPageToken);

    if (data) {
      if (data.items.length === 0) {
        setHasMore(false);
      }

      setVideos((prevVideos) => {
        return [...prevVideos, ...data.items] as any // TODO: Create lib and put there types common to proxy and client, meanwhile any
      });
      setNextPageToken(data.nextPageToken);
    }
  };

  const handleScroll = () => {
    if (
      window.innerHeight + window.scrollY >= document.body.offsetHeight - 500
    ) {
      handleLoadVideos();
    }
  };

  return {
    apiKey,
    channelName,
    statistics,
    avatar,
    channelId,
    videos,
    hasMore,
    handleLoadVideos,
    handleNext,
    handleChangeApiKey,
    handleChangeChannelName,
  };
};
