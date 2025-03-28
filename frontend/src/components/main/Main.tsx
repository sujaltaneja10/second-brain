/* eslint-disable @typescript-eslint/no-explicit-any */
import { Plus, Share2 } from 'react-feather';
import { Button } from '../Button';
import ShareModal from '../ShareModal';
import { useEffect, useState } from 'react';
import axios from 'axios';
import { BACKEND_URL } from '../../config';
import AddModal from '../AddModal';
import CardSection from './CardSection';

export interface contentStateType {
  title: string;
  type?: string;
  link?: string;
  tags?: Array<string>;
}

function ShareBrainHandler({
  open,
  setIsOpen,
}: {
  open: boolean;
  setIsOpen: (open: boolean) => void;
}) {
  return <ShareModal open={open} onOpenChange={setIsOpen} />;
}

function AddContentHandler({
  open,
  setIsOpen,
  changeContentState,
}: {
  open: boolean;
  setIsOpen: (open: boolean) => void;
  changeContentState: ({ title, type, link, tags }: contentStateType) => void;
}) {
  return (
    <AddModal
      open={open}
      onOpenChange={setIsOpen}
      changeContentState={changeContentState}
    />
  );
}

function useContent() {
  const [content, setContent] = useState([]);

  useEffect(() => {
    axios
      .get(`${BACKEND_URL}/api/v1/content`, {
        headers: {
          Authorization: 'Bearer ' + localStorage.getItem('authorization'),
        },
      })
      .then((response) =>
        setContent((response.data as { content: any[] }).content)
      );
  }, []);

  const removeContent = (id: string) => {
    setContent((prev) => prev.filter((item) => item._id !== id));
  };

  const addContent = (newContent) => {
    setContent((prev) => [...prev, newContent]);
  };

  return { content, removeContent, addContent };
}

export default function Main() {
  const [shareModalOpen, setShareModalOpen] = useState(false);
  const [addModalOpen, setAddModalOpen] = useState(false);
  const { content, removeContent, addContent } = useContent();

  return (
    <main className="bg-main-bg p-10 py-6 flex-1 h-full min-h-screen">
      <section className="flex items-center gap-6 mb-6">
        <div className="mr-auto text-xl font-bold">All Notes</div>
        <Button
          variant={'primary'}
          size={'md'}
          text={'Share Brain'}
          onClick={() => setShareModalOpen(true)}
          startIcon={(size) => <Share2 size={size} />}
        />
        <Button
          variant={'secondary'}
          size={'md'}
          text={'Add Content'}
          onClick={() => setAddModalOpen(true)}
          startIcon={(size) => <Plus size={size} />}
        />
      </section>
      <ShareBrainHandler open={shareModalOpen} setIsOpen={setShareModalOpen} />
      <AddContentHandler
        open={addModalOpen}
        setIsOpen={setAddModalOpen}
        changeContentState={addContent}
      />

      <CardSection content={content} removeContent={removeContent} />
    </main>
  );
}
