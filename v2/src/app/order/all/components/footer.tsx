import Link from "next/link";

interface FooterProps {
  total: number;
}

export function Footer({ total }: FooterProps) {
  return (
    <div className="flex w-full px-20 items-center py-2 mt-auto fixed bottom-10">
      <div className="flex flex-col justify-center">
        <h3 className="text-[12px]">Total Vendido</h3>
        <h1 className="font-semibold text-[20px]">{total}</h1>
      </div>
      <div className="absolute right-20">
        <Link
          className=""
          href={"/order/new"}
        >
          <button className="bg-transparent border-neutral-100 text-[13px] hover:bg-purple-900 hover:border-purple-900 h-[45px] rounded-lg w-[160px] border-2">Novo</button>

        </Link>
      </div>
    </div>
  );
}
