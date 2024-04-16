import { useState, type SVGProps } from "react";

interface Props {
  project: {
    name: string;
    language: string;
    description: string;
    tools: string[];
    href: string;
  };
}

function PlusIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg width="1em" height="1em" viewBox="0 0 24 24" {...props}>
      <path fill="currentColor" d="M19 13h-6v6h-2v-6H5v-2h6V5h2v6h6z"></path>
    </svg>
  );
}

export default function Project({ project }: Props) {
  const [open, setOpen] = useState(false);
  return (
    <li className="flex flex-col border-b border-secondary pb-0.5 mb-5">
      <div className="flex justify-between items-center">
        <a href={project.href} target="_blank" rel="noopener noreferrer">
          <h2
            className={`font-semibold hover:underline transition-all ${
              open ? "text-3xl" : "text-2xl"
            }`}
          >
            .{project.name}
          </h2>
        </a>
        <button type="button" title="More Info" onClick={() => setOpen(!open)}>
          <PlusIcon className="size-4 text-primary hover:text-secondary" />
        </button>
      </div>
      <div
        className={`pl-3 overflow-hidden animation duration-300 flex flex-col ${
          open ? "h-auto sm:h-16 opacity-100" : "h-0 opacity-0"
        }`}
      >
        <span className="font-semibold text-secondary pl-1">
          {project.language}
        </span>
        <div className="py-1 font-extralight text-primary/90 text-sm flex flex-row gap-2 flex-wrap">
          {project.tools.map((tool, index) => (
            <span
              className="bg-secondary/20 text-xs rounded-full px-2 py-0.5 font-semibold"
              key={index}
            >
              {tool}
            </span>
          ))}
        </div>
      </div>

      <p className="text-lg font-bold text-secondary pl-3">
        {project.description}
      </p>
    </li>
  );
}
