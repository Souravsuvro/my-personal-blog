import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FiClock, FiEye, FiHeart, FiTag } from 'react-icons/fi';
import type { BlogCardProps } from '@/types/blog';
import { fadeInUp } from '@/utils/animations';
import { categories } from '@/data/categories';
import {
  Card,
  ImageContainer,
  Image,
  Content,
  TagsContainer,
  Tag,
  Title,
  Excerpt,
  Meta,
  MetaItem,
} from './BlogCard.styles';

export const BlogCard: React.FC<BlogCardProps> = ({ post, variant = 'default' }) => {
  // Get category names from category IDs
  const postCategories = post.categories.map(categoryId => {
    if (typeof categoryId === 'string') {
      const category = categories.find(cat => cat.id === categoryId);
      return {
        name: category?.name || categoryId,
        slug: category?.slug || categoryId.toLowerCase()
      };
    }
    return {
      name: categoryId.name,
      slug: categoryId.slug
    };
  });

  return (
    <Card
      $variant={variant}
      variants={fadeInUp}
      initial="hidden"
      animate="visible"
      whileHover={{ y: -4 }}
    >
      <ImageContainer>
        <Image src={post.coverImage} alt={post.title} />
      </ImageContainer>
      <Content>
        <TagsContainer>
          {postCategories.slice(0, 3).map((category) => (
            <Tag
              key={category.name}
              as={motion.a}
              href={`/blog/category/${category.slug}`}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <FiTag /> {category.name}
            </Tag>
          ))}
        </TagsContainer>
        <Title>
          <Link to={`/blog/${post.slug}`}>{post.title}</Link>
        </Title>
        <Excerpt>{post.excerpt}</Excerpt>
        <Meta>
          <MetaItem>
            <FiClock />
            {post.readingTime}
          </MetaItem>
          {post.views && (
            <MetaItem>
              <FiEye />
              {post.views} views
            </MetaItem>
          )}
          {post.likes && (
            <MetaItem>
              <FiHeart />
              {post.likes} likes
            </MetaItem>
          )}
        </Meta>
      </Content>
    </Card>
  );
};

export default BlogCard;
