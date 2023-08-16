import React, { useState } from 'react';
import './App.css'
import DownloadIcon from '@mui/icons-material/Download';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function App() {
  const [fileUrl, setFileUrl] = useState('');
  const [downloadBtnText, setDownloadBtnText] = useState('Download File');

  const fetchFile = async (url) => {
    try {
      const res = await fetch(url);
      const file = await res.blob();
      const tempUrl = URL.createObjectURL(file);
      const aTag = document.createElement('a');
      aTag.href = tempUrl;
      aTag.download = url.replace(/^.*[\\\/]/, '').replace(/\.\w+$/, '.jpg');
      document.body.appendChild(aTag);
      aTag.click();
      setDownloadBtnText('Download File');
      URL.revokeObjectURL(tempUrl);
      aTag.remove();

      toast.success("File Downloaded Successfully", {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
        });

    } catch (error) {
      setDownloadBtnText('Download File');
      toast.error('Failed to download file!', {
        position: "top-center",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
        });
    }
  };
  

  const handleDownload = (e) => {
    e.preventDefault();
    setDownloadBtnText("Downloading file...");
    fetchFile(fileUrl);
  };

  return (
    <>
    <div className="wrapper">
      <header>
        <h1>File Downloader</h1>
        <p>Paste url of image, video, or pdf to download.</p>
      </header>
      <form onSubmit={handleDownload}>
        <input
          type="url"
          placeholder="Paste file url"
          required
          value={fileUrl}
          onChange={(e) => setFileUrl(e.target.value)}
        />
        <button> <DownloadIcon/> {downloadBtnText}</button>
      </form>
    </div>
    <ToastContainer />
    </>
  );
}

export default App;
