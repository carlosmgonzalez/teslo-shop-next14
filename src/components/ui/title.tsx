import { titleFont } from "@/config/fonts";

interface Props {
  title: string;
  subtitle?: string;
  className?: string;
}

export const Title = ({ className, subtitle, title }: Props) => {
  return (
    <div className={`mt-3 ${className}`}>
      <h1
        className={`${titleFont.className} antialiased text-4x font-semibold my-6`}
      >
        {title}
      </h1>
      {subtitle && <h3 className="text-xl mb-10">{subtitle}</h3>}
    </div>
  );
};
