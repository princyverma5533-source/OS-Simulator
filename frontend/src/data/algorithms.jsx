import {
  CpuIcon,
  DeadlockIcon,
  DiskIcon,
  FileIcon,
  MemoryIcon,
  PageIcon,
} from "../components/icons/AlgorithmIcons";

export const algorithms = [
  {
    title: "CPU Scheduling",
    tag: "Processes",
    description: "Compare how scheduling policies organize ready-queue execution and processor time.",
    href:"/cpu-scheduling",
    icon: CpuIcon,
  },
  {
    title: "Memory Management",
    tag: "Allocation",
    description: "Visualize block allocation strategies and how memory space is assigned to processes.",
    href:"/memory-management",
    icon: MemoryIcon,
  },
  {
    title: "Page Replacement",
    tag: "Paging",
    description: "Study page frames, references, and replacement decisions in virtual memory systems.",
    href:"/page-replacement",
    icon: PageIcon,
  },
  {
    title: "Disk Scheduling",
    tag: "I/O",
    description: "Understand request ordering and head movement across common disk scheduling methods.",
    href:"/disk-scheduling",
    icon: DiskIcon,
  },
  {
    title: "Deadlock",
    tag: "Safety",
    description: "Inspect resource allocation states and safe-sequence thinking for concurrent processes.",
    href:"/deadlock",
    icon: DeadlockIcon,
  },
  {
    title: "File Management",
    tag: "Storage",
    description: "Explore file-system organization concepts through a clean management module entry point.",
    href:"/file-management",
    icon: FileIcon,
  },
];
