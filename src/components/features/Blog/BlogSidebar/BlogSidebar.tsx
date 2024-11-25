import React from 'react';
import { Link } from 'react-router-dom';
import { FiClock, FiTag } from 'react-icons/fi';
import type { BlogSidebarProps } from '@/types/blog';
import { fadeInUp, stagger } from '@/utils/animations';
import {
  SidebarContainer,
  SidebarSection,
  SectionTitle,
  TagsList,
  Tag,
  PopularPostsList,
  PopularPost,
  PostThumbnail,
  PostInfo,
  PostTitle,
  PostMeta,
} from './BlogSidebar.styles';

export const BlogSidebar: React.FC<BlogSidebarProps> = ({
  tags,
  popularPosts,
  onTagClick,
}) => {
  return (
    <SidebarContainer
      variants={stagger}
      initial="hidden"
      animate="visible"
      viewport={{ once: true }}
    >
      {/* Tags Section */}
      <SidebarSection variants={fadeInUp}>
        <SectionTitle>Popular Tags</SectionTitle>
        <TagsList>
          {tags.map((tag) => (
            <Tag
              key={tag.name}
              href={`/blog/tag/${tag.slug}`}
              onClick={(e) => {
                e.preventDefault();
                onTagClick?.(tag);
              }}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <FiTag />
              {tag.name}
              <span>({tag.count})</span>
            </Tag>
          ))}
        </TagsList>
      </SidebarSection>

      {/* Popular Posts Section */}
      <SidebarSection variants={fadeInUp}>
        <SectionTitle>Popular Posts</SectionTitle>
        <PopularPostsList>
          {popularPosts.map((post) => (
            <PopularPost
              key={post.id}
              as={Link}
              to={`/blog/${post.slug}`}
              variants={fadeInUp}
              whileHover={{ y: -2 }}
            >
              <PostThumbnail>
                <img src={post.coverImage} alt={post.title} />
              </PostThumbnail>
              <PostInfo>
                <PostTitle>{post.title}</PostTitle>
                <PostMeta>
                  <FiClock />
                  {post.readingTime}
                </PostMeta>
              </PostInfo>
            </PopularPost>
          ))}
        </PopularPostsList>
      </SidebarSection>
    </SidebarContainer>
  );
};

export default BlogSidebar;
