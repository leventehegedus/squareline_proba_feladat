import { Text, Flex } from "@radix-ui/themes";

const Banner: React.FC = () => {
  return (
    <Flex
      style={{ backgroundImage: "url(./banner.png)" }}
      className="bg-cover bg-bottom h-80 items-center p-16"
    >
      <Flex
        direction={"column"}
        align={"start"}
        gap={"6"}
        className="text-2xl uppercase text-orange-800 font-bold"
      >
        <Text>New</Text>
        <Text>Books</Text>
        <Text>Everyday</Text>
      </Flex>
    </Flex>
  );
};
export default Banner;
