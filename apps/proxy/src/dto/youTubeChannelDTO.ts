interface YouTubeChannelDataItem {
  kind: string;
  etag: string;
  id: string;
  snippet: {
    title: string;
    description: string;
    customUrl: string;
    publishedAt: string;
    thumbnails: {
      default: {
        url: string;
        width: number;
        height: number;
      };
      medium: {
        url: string;
        width: number;
        height: number;
      };
      high: {
        url: string;
        width: number;
        height: number;
      };
    };
    localized: {
      title: string;
      description: string;
    };
    country: string;
  };
  contentDetails: {
    relatedPlaylists: {
      likes: string;
      uploads: string;
    };
  };
  statistics: {
    viewCount: string;
    subscriberCount: string;
    hiddenSubscriberCount: boolean;
    videoCount: string;
  };
};

export interface YouTubeChannelResponse {
  kind: string;
  etag: string;
  pageInfo: {
    totalResults: number;
    resultsPerPage: number;
  };
  items: YouTubeChannelDataItem[];
};

export class YouTubeChannelDTO {

  constructor(private readonly data: YouTubeChannelDataItem) {}

  private get statistics() {
    return {
      viewCount: this.data.statistics.viewCount,
      subscriberCount: this.data.statistics.subscriberCount,
      videoCount: this.data.statistics.videoCount,
    };
  }

  private get avatar() {
    return this.data.snippet.thumbnails.high.url;
  }

  toJSON() {
    return {
      channelId: this.data.id,
      statistics: this.statistics,
      avatar: this.avatar,
    };
  }
}