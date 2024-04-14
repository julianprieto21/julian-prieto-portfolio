import { useState, type SVGProps } from "react";

interface Props {
  item: {
    place: string;
    trajectory: { position: string; start: string; finish: string | null }[];
  };
  index: number;
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

function TimeLine(props: {
  trajectory: { position: string; start: string; finish: string | null }[];
  open: boolean;
}) {
  const open = props.open;
  const trajectoryLength = props.trajectory.length;

  return (
    <div
      style={{ height: open ? 40 * trajectoryLength : 0 }}
      className={`${
        open ? "opacity-100 my-2" : "opacity-0"
      } w-full transition-all duration-300 flex flex-row overflow-auto relative ml-3`}
    >
      <span className="border-l border-dashed border-primary absolute h-full left-[77px]"></span>
      <ul className="w-full flex flex-col justify-between">
        {props.trajectory.map((trajectory, index) => (
          <li
            key={index}
            className="flex flex-row justify-start gap-2 items-center text-secondary"
          >
            <span>{trajectory.start}</span>
            <span className="w-3 h-3 rounded-full bg-primary" />
            <span className="font-bold text-lg">{trajectory.position}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default function ExperienceItem({ item, index }: Props) {
  const [open, setOpen] = useState(false);
  const trajectoryLength = item.trajectory.length;
  const first = item.trajectory[0];
  const last = item.trajectory[trajectoryLength - 1];

  return (
    <li key={index} className="border-b border-secondary pb-0.5">
      <div className="flex flex-row items-center justify-start relative">
        <main>
          <a
            href="https://seidoranalytics.com/"
            target="_blank"
            rel="noopener noreferrer"
          >
            <h2
              className={`font-semibold transition-all duration-300 hover:underline ${
                open ? "translate-y-5 text-3xl" : "translate-y-0 text-2xl"
              }`}
            >
              .{item.place}
            </h2>
          </a>
          <h3
            className={`font-bold text-secondary text-lg transition duration-150 pl-3 ${
              open ? "opacity-0" : "opacity-100"
            }`}
          >
            {first.start} - {last.finish ? last.finish : "Actualidad"}
          </h3>
        </main>
        <button
          title="Experience Item"
          type="button"
          className="absolute right-0 group"
          onClick={() => setOpen(!open)}
        >
          {open ? (
            <ArrowUnionVertical className="size-10 text-secondary/40 group-hover:text-primary transition" />
          ) : (
            <ArrowSeparateVertical className="size-10 text-secondary/40 group-hover:text-primary transition" />
          )}
        </button>
      </div>
      <TimeLine trajectory={item.trajectory} open={open} />
    </li>
  );
}
