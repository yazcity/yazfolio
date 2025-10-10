import React, { useState, useEffect, useContext } from "react";
import "./Blog.scss";
import BlogCard from "../../components/blogCard/BlogCard";
import { blogSection } from "../../portfolio";
import { motion } from "framer-motion";
import StyleContext from "../../contexts/StyleContext";

export default function Blogs() {
  const { isDark } = useContext(StyleContext);
  const [mediumBlogs, setMediumBlogs] = useState([]);

  function setMediumBlogsFunction(array) {
    setMediumBlogs(array);
  }

  // Extracts plain text from Medium HTML
  function extractTextContent(html) {
    return typeof html === "string"
      ? html
          .split(/<\/p>/i)
          .map((part) => part.split(/<p[^>]*>/i).pop())
          .filter((el) => el.trim().length > 0)
          .map((el) => el.replace(/<\/?[^>]+(>|$)/g, "").trim())
          .join(" ")
      : NaN;
  }

  useEffect(() => {
    if (blogSection.displayMediumBlogs === "true") {
      const getProfileData = () => {
        fetch("/blogs.json")
          .then((result) => {
            if (result.ok) {
              return result.json();
            }
          })
          .then((response) => {
            setMediumBlogsFunction(response.items);
          })
          .catch(function (error) {
            console.error(
              `${error} (because of this error Blogs section could not be displayed. Blogs section has reverted to default)`
            );
            setMediumBlogsFunction("Error");
            blogSection.displayMediumBlogs = "false";
          });
      };
      getProfileData();
    }
  }, []);

  if (!blogSection.display) return null;

  return (
    <motion.div
      className="main"
      id="blogs"
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 1 }}
    >
      <div className="blog-header">
        <h1 className="blog-header-text">{blogSection.title}</h1>
        <p
          className={
            isDark ? "dark-mode blog-subtitle" : "subTitle blog-subtitle"
          }
        >
          {blogSection.subtitle}
        </p>
      </div>

      <div className="blog-main-div">
        <div className="blog-text-div">
          {blogSection.displayMediumBlogs !== "true" || mediumBlogs === "Error"
            ? blogSection.blogs.map((blog, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: i * 0.15 }}
                >
                  <BlogCard
                    isDark={isDark}
                    blog={{
                      url: blog.url,
                      image: blog.image,
                      title: blog.title,
                      description: blog.description,
                    }}
                  />
                </motion.div>
              ))
            : mediumBlogs.map((blog, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: i * 0.15 }}
                >
                  <BlogCard
                    isDark={isDark}
                    blog={{
                      url: blog.link,
                      title: blog.title,
                      description: extractTextContent(blog.content),
                    }}
                  />
                </motion.div>
              ))}
        </div>
      </div>
    </motion.div>
  );
}
