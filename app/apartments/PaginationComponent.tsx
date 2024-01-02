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

  const handleOnChange = (newPage: number) => {
    const isValidPage = newPage >= 1 && newPage <= totalPages;

    if (isValidPage) {
      const params = new URLSearchParams(searchParams);

      if (newPage !== 1) {
        params.set("page", newPage.toString());
      } else {
        params.delete("page");
      }

      replace(`${pathname}?${params.toString()}`);
    }
  };

  return (
    <Pagination
      key={searchParams.get("query")}
      total={totalPages}
      size="md"
      showControls
      onChange={handleOnChange}
      initialPage={parseInt(searchParams.get("page") || "1", 10)}
    />
  );
};

export default PaginationComponent;
