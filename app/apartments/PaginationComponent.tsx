"use client";
import { usePathname, useRouter, useSearchParams } from "next/navigation";

import { Pagination } from "@nextui-org/react";

type Props = {
  count: number;
  currentPage: number;
};

const PaginationComponent = ({ count, currentPage }: Props) => {
  const itemsPerPage = 10;
  const totalPages = Math.ceil(count / itemsPerPage);
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const { replace } = useRouter();
  const handleOnchange = (newPage: number) => {
    console.log(newPage);
    const params = new URLSearchParams(searchParams);
    if (newPage) {
      params.set("page", newPage.toString());
    } else {
      params.delete("page");
    }
    replace(`${pathname}?${params.toString()}`);
  };

  return (
    <Pagination
      key={searchParams.get("query")}
      total={totalPages}
      size="md"
      showControls
      onChange={(newPage: number) => handleOnchange(newPage)}
      initialPage={parseInt(searchParams.get("page")?.toString() || "1")}
    />
  );
};

export default PaginationComponent;
