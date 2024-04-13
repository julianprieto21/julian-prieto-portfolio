import { useState, type SVGProps } from "react";

interface Props {
  item: {
    place: string;
    trajectory: { position: string; start: string; finish: string | null }[];
  };
}

function ArrowSeparateVertical(props: SVGProps<SVGSVGElement>) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="1em"
      height="1em"
      viewBox="0 0 24 24"
      {...props}
    >
      <path
        fill="none"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="1.5"
        d="m17 8l-5-5l-5 5m10 8l-5 5l-5-5"
      />
    </svg>
  );
}

function ArrowUnionVertical(props: SVGProps<SVGSVGElement>) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="1em"
      height="1em"
      viewBox="0 0 24 24"
      {...props}
    >
      <path
        fill="none"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="1.5"
        d="m17 4l-5 5l-5-5m10 16l-5-5l-5 5"
      />
    </svg>
  );
}

export default function ExperienceItem({ item }: Props) {
  const [open, setOpen] = useState(false);
  const trajectoryLength = item.trajectory.length;
  const first = item.trajectory[0];
  const last = item.trajectory[trajectoryLength - 1];

  return (
    <li key={item.place}>
      <ul
        className={`${
          open ? "opacity-100" : "opacity-0"
        } w-full transition-all flex flex-col justify-end delay-100`}
      >
        {item.trajectory
          .slice(0, trajectoryLength - 1)
          .map((trajectory, index) => (
            <>
              <li
                key={index}
                className={`flex flex-row items-center justify-start transition-all delay-100 border-r border-secondary/10 ${
                  open ? "h-[60px]" : "h-0"
                }`}
              >
                <span className="w-4 h-4 rounded-full bg-primary mr-4" />
                <main>
                  <h2 className="text-2xl font-medium">
                    {trajectory.start} - {trajectory.finish}
                  </h2>
                  <h3 className="font-bold text-secondary text-lg">
                    {trajectory.position} | {item.place}
                  </h3>
                </main>
              </li>
              {item.trajectory[index + 1] ? (
                <li className="border-l border-dashed border-primary h-8 ml-[7px]" />
              ) : null}
            </>
          ))}
      </ul>
      <div className="flex flex-row items-center justify-start relative">
        <span className="w-4 h-4 rounded-full bg-primary mr-4" />
        <main>
          <h2 className={`text-2xl font-medium `}>
            {open ? last.start : first.start} -{" "}
            {last.finish ? last.finish : "Actualidad"}
          </h2>
          <h3 className={`font-bold text-secondary text-lg `}>
            {last.position} | {item.place}
          </h3>
        </main>
        <button
          title="Experience Item"
          type="button"
          className="absolute right-0 group"
          onClick={() => setOpen(!open)}
        >
          {open ? (
            <ArrowUnionVertical className="size-10 text-secondary/20 group-hover:text-primary transition" />
          ) : (
            <ArrowSeparateVertical className="size-10 text-secondary/20 group-hover:text-primary transition" />
          )}
        </button>
      </div>
    </li>
  );
}
