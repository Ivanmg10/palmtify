import FooterLeft from "../footer-left/FooterLeft";
import FooterCenter from "../footer-center/FooterCenter";
import FooterRight from "../footer-right/FooterRight";

export default function MainBottomReproducer() {
  return (
    <div className="flex flex-row justify-between items-center p-3 text-[#b3b3b3]">
      <FooterLeft />

      <FooterCenter />

      <FooterRight />
    </div>
  );
}
