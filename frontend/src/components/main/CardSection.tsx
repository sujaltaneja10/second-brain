/* eslint-disable @typescript-eslint/no-explicit-any */
import Card from './Card';

export default function CardSection({ content, removeContent }) {
  return (
    <section className="flex flex-wrap gap-4">
      {content.map((card: any, index) => (
        <Card
          key={index}
          content={card.content}
          type={card.type}
          title={card.title}
          tags={card.tags}
          link={card.link}
          id={card._id}
          removeContent={removeContent}
        />
      ))}
    </section>
  );
}
