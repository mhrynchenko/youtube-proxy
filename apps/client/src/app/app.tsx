import { useApp } from './useApp';
import styles from './app.module.scss';

export function App() {
  const {
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
  } = useApp();

  return (
    <div>
      <div>
        <label>API key:</label>
        <input
          id="apiKey"
          type="text"
          value={apiKey}
          onChange={handleChangeApiKey}
        />
      </div>
      <div>
        <label>Channel Name:</label>
        <input
          id="channelName"
          type="text"
          value={channelName}
          onChange={handleChangeChannelName}
        />
      </div>
      <button onClick={handleNext}>Next</button>
      <br />
      <hr />
      <br />
      {statistics && (
        <>
          <h4>Channel Statistics:</h4>
          <pre>
            {JSON.stringify(statistics)}
          </pre>
        </>
      )}
      {avatar && (
        <img src={avatar} width={200} />
      )}
      <div>
        {channelId && (
          <button onClick={handleLoadVideos}>Load Videos</button>
        )}
        {videos.length > 0 && (
          <>
            {videos.map((item, i) => {
              return (
                <pre key={i}>
                  {JSON.stringify(item)}
                </pre>
              );
            })}
            {hasMore && <p>Loading more...</p>}
          </>
        )}
      </div>
    </div>
  );
}

export default App;
