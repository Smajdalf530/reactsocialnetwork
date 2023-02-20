import React from 'react';
import PropTypes from 'prop-types';
import '../assets/Post.css';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import InsertPhotoIcon from '@mui/icons-material/InsertPhoto';
import VideoFileIcon from '@mui/icons-material/VideoFile';
import MoodIcon from '@mui/icons-material/Mood';
import { IconButton } from '@mui/material';
// import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
// import Home from './Home';
// import Settings from './Settings';
// import Admin from './Admin';
// import Login from './Login';

function Post({toggle, userAvatar, userName = ""}) {

  const theme = toggle ? "light-mode" : "dark-mode";
  
    return (
      <div className={`Section-container  ${theme}`}>

        <div className={`Post-header  ${theme+"-header"}`}>
          <h3 className="Post-title">Post</h3>
        </div>

        <h4>Welcome to your Post {userName}!</h4>

        <form className={`Post-create  ${theme}`}>

          <div className='Post-basics'>

            <div className='Post-avatar'>
              {userAvatar ?
                <img src={userAvatar} alt="user avatar"/>
                :
                <IconButton 
                  className="Post-empty-avatar" 
                  aria-label="search-button"
                >
                  <AccountCircleIcon
                    fontSize='inherit'
                    aria-label="empty avatar"
                    aria-labelledby="empty avatar"
                    sx={{ color: "#fff" }}
                  />
                </IconButton>
              }
            </div>
            <input 
              dir='ltr'
              placeholder='Start a post'
              aria-invalid="false"
              aria-label='Area to write post'
              className={`Post-text ${theme}`} 
              type="text" 
              autoComplete='off'/>
            <input 
              className={`Post-submit  ${theme}`} 
              type="submit" 
              value="Public"
            />

          </div>

          <div className='Post-uploads'>

            <IconButton 
              className="Post-add-photo" 
              aria-label="add-photo"
            >
              <InsertPhotoIcon
                fontSize='inherit'
                aria-label="add photo"
                aria-labelledby="add photo"
                sx={{ color: "#054a91" }}
              />
              <span className={`Post-icon-label ${theme}`}>Add Photo</span>
            </IconButton>
            <IconButton 
              className="Post-add-video" 
              aria-label="add-video"
            >
              <VideoFileIcon
                fontSize='inherit'
                aria-label="add video"
                aria-labelledby="add video"
                sx={{ color: "#931621" }}
              />
              <span className={`Post-icon-label ${theme}`}>Add Video</span>
            </IconButton>
            <IconButton 
              className="Post-add-mood" 
              aria-label="add-mood"
            >
              <MoodIcon
                fontSize='inherit'
                aria-label="add mood"
                aria-labelledby="add mood"
                sx={{ color: "#FFD369" }}
              />
              <span className={`Post-icon-label ${theme}`}>Add Mood</span>
            </IconButton>

          </div>

        </form>
      </div>
    );
  
}
Post.propTypes = {
  toggle: PropTypes.bool,
  // I think avatar could be passed as an image src
  userAvatar: PropTypes.node,
  userName: PropTypes.string
 };

export default Post;