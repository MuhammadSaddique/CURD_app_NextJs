'use client'
import React, { useEffect, useState } from "react";
import Link from "next/link";
import { HiPencilAlt } from "react-icons/hi";
import RemoveBtn from "./RemoveBtn"; // Import RemoveBtn if it's defined elsewhere

const TopicList = () => {
  const [topics, setTopics] = useState([]);

  useEffect(() => {
    const getTopics = async () => {
      try {
        const res = await fetch("http://localhost:3000/api/topics");
        if (!res.ok) {
          throw new Error("Failed to fetch topics");
        }
        const topicsData = await res.json(); // Await the JSON parsing
        setTopics(topicsData.topics);
        console.log("--------->",topicsData.topics) // Set the topics state with the fetched data
      } catch (error) {
        console.log("Error loading Topics", error);
      }
    };

    getTopics(); // Call the async function
  }, []);

  return (
    <div>
      {topics.map((t) => (
        <div
          key={t._id} // Make sure to provide a unique key for each list item
          className="p-4 border border-slate-300 my-3 flex justify-between gap-5 items-start"
        >
          <div>
            <h2 className="font-bold text-2xl">{t.title}</h2>
            <div>{t.description}</div>
          </div>
          <div className="flex gap-2">
            <RemoveBtn id={t._id} />
            <Link  href={`/editTopic/${t._id}`}>
              <HiPencilAlt size={24} />
            </Link>
          </div>
        </div>
      ))}
    </div>
  );
};




export default TopicList;
