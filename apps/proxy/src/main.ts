import express from 'express';
import * as path from 'node:path';
import axios from 'axios';

import { PAGE_SIZE, URLS } from './constants';
import {
  YouTubeChannelDTO,
  YouTubeChannelResponse,
  PlaylistDTO,
  PlaylistListResponse,
} from './dto';

const app = express();

app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');

  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');

  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');

  res.setHeader('Access-Control-Allow-Credentials', 'true');

  next();
});

app.use('/assets', express.static(path.join(__dirname, 'assets')));

app.get('/api/channel', async (req, res) => {
  try {
    const { apiKey, forUserName } = req.query;

    if (!apiKey || !forUserName) {
      return res.status(400).json({
        error: 'apiKey and forUserName are required.'
      });
    }

    const urlParams = new URLSearchParams({
      part: 'snippet,contentDetails,statistics',
      forUsername: forUserName.toString(),
      key: apiKey.toString(),
    });

    const response = await axios.get<YouTubeChannelResponse>(`${URLS.CHANNEL}?${urlParams.toString()}`);
    const dto = new YouTubeChannelDTO(response.data.items[0]);

    res.json(dto);
  } catch (error) {
    console.error('Error:', error.message);
    res.status(500).json({ error: 'An error occurred while fetching data from the YouTube API.' });
  }
});

app.get('/api/playlists/:channelId', async (req, res) => {
  try {
    const { channelId } = req.params;
    const { apiKey, nextPageToken } = req.query;

    if (!apiKey || !channelId) {
      return res.status(400).json({
        error: 'apiKey and channelId are required.',
      });
    }

    const urlParams = new URLSearchParams({
      part: 'snippet,contentDetails',
      channelId: channelId.toString(),
      maxResults: PAGE_SIZE.toString(),
      key: apiKey.toString(),
    });

    if (nextPageToken) {
      urlParams.append('pageToken', nextPageToken.toString());
    }

    const response = await axios.get<PlaylistListResponse>(`${URLS.PLAYLIST}?${urlParams.toString()}`);
    const playlistDTO = new PlaylistDTO(response.data);
    
    res.json(playlistDTO);
  } catch (error) {
    console.error('Error:', error.message);
    res.status(500).json({
      error: 'An error occurred while fetching data from the YouTube API.',
    });
  }
});

const port = process.env.PORT || 3333;
const server = app.listen(port, () => {
  console.log(`Listening at http://localhost:${port}/api`);
});

server.on('error', console.error);
