import React from 'react';
import {
  FacebookShareButton,
  TwitterShareButton,
  LinkedinShareButton,
  RedditShareButton,
  FacebookIcon,
  TwitterIcon,
  LinkedinIcon,
  RedditIcon,
} from 'react-share';
import * as S from './ShareButtons.styles';

interface ShareButtonsProps {
  url: string;
  title: string;
  description: string;
}

const ShareButtons: React.FC<ShareButtonsProps> = ({ url, title, description }) => {
  return (
    <S.Container>
      <S.Title>Share this post</S.Title>
      <S.ButtonsContainer>
        <FacebookShareButton url={url} quote={description}>
          <FacebookIcon size={32} round />
        </FacebookShareButton>

        <TwitterShareButton url={url} title={title}>
          <TwitterIcon size={32} round />
        </TwitterShareButton>

        <LinkedinShareButton url={url} title={title} summary={description}>
          <LinkedinIcon size={32} round />
        </LinkedinShareButton>

        <RedditShareButton url={url} title={title}>
          <RedditIcon size={32} round />
        </RedditShareButton>
      </S.ButtonsContainer>
    </S.Container>
  );
};

export default ShareButtons;
