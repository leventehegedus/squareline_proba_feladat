import { useAppSelector } from "@/hooks";
import { IBook } from "@/types/book";
import { Text, Box } from "@radix-ui/themes";
import Book from "../Book/Book";

const Favorites: React.FC = () => {
  const favorites: IBook[] = useAppSelector((state) => state.favoriteSlice);

  return (
    <Box className="p-16 text-left w-full">
      <Text className="text-2xl uppercase text-orange-800 font-bold">
        Favorites
      </Text>

      <Box className="grid grid-cols-1 lg:grid-cols-5	gap-2">
        {favorites.map((book: IBook) => (
          <Book
            title={book.title}
            subtitle={book.subtitle}
            isbn13={book.isbn13}
            price={book.price}
            image={book.image}
            url={book.url}
            key={book.isbn13}
          />
        ))}
      </Box>
    </Box>
  );
};

export default Favorites;
