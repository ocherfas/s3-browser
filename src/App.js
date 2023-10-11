import './App.css';
import { useEffect, useState } from 'react';
import { S3Client, GetObjectCommand } from '@aws-sdk/client-s3';
// Pass in your AWS S3 credentials


const s3Client = new S3Client({
  region: 'us-east-1',
  credentials: {
    accessKeyId: ACCESS_KEY,
    secretAccessKey: SECRET_KEY,
  },
});

function App() {
  const [fileUrl, setFileUrl] = useState(null)

  useEffect(() => {
    const fetchVideo = async () => {
      const getObjectParams = {
        Bucket: BUCKET_NAME,
        Key: PATH_TO_FILE,
      };

      const command = new GetObjectCommand(getObjectParams);
      const response = await s3Client.send(command);
      const videoDataUrl = URL.createObjectURL(new Blob([response.Body]));
      setFileUrl(videoDataUrl)
    }

    fetchVideo()
  }, [])

  console.log(fileUrl)
  return (
    <div className="App">
      <div>
        {fileUrl && (
          <video controls width="640" height="360">
            <source src={fileUrl} type="video/mp4" />
            Your browser does not support the video tag.
          </video>
        )}
      </div>
    </div>
  );
}

export default App;


