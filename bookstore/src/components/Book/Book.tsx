import { updateFavorite } from "@/features/favorites/favoriteSlice";
import { useAppDispatch, useAppSelector } from "@/hooks";
import { IBook } from "@/types/book";
import { Flex, Text, Box } from "@radix-ui/themes";
import Star from "./assets/star-1-svgrepo-com.svg";
import StarSlash from "./assets/star-slash-svgrepo-com.svg";

const Book: React.FC<{ book: IBook }> = ({ book }) => {
  const dispatch = useAppDispatch();
  const favorites = useAppSelector((state) => state.favoriteSlice);

  const addFav = (book: IBook) => {
    dispatch(updateFavorite(book));
  };
  const isFavorite = (isbn13: string) => {
    const existingIndex = favorites.findIndex(
      (favorite) => favorite.isbn13 === isbn13
    );
    if (existingIndex !== -1) {
      return true;
    } else {
      return false;
    }
  };

  const getRoundedPriceString = (priceString: string) => {
    const price = parseFloat(priceString.replace("$", ""));
    const roundedPrice = Math.round(price);
    const roundedPriceString = "$" + roundedPrice;
    return roundedPriceString;
  };

  return (
    <Flex direction={"column"} className="cursor-pointer items-center">
      <Box
        style={{ backgroundImage: `url(${book.image})` }}
        onClick={() => addFav(book)}
        className="w-full max-w-[300px] h-[350px] relative bg-cover bg-center"
      >
        <Flex
          className="absolute w-[50px] h-[50px] rounded-full bg-orange-400 text-slate-50 bottom-0 left-1/2 -translate-x-1/2"
          align="center"
          justify="center"
        >
          <Text>{getRoundedPriceString(book.price)}</Text>
        </Flex>
        <Box className="absolute top-4 left-4">
          <img
            src={isFavorite(book.isbn13) ? StarSlash : Star}
            alt={isFavorite(book.isbn13) ? StarSlash : Star}
            className="w-6"
          />
        </Box>
      </Box>
      <Box>
        <Text as="div" align={"center"} className="font-bold">
          {book.title}
        </Text>
        <Text as="div" align={"center"}>
          {book.subtitle}
        </Text>
      </Box>
    </Flex>
  );
};

export default Book;
