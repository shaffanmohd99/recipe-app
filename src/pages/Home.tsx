import { useQuery } from "@tanstack/react-query";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import LoadingState from "@/components/ui/LoadingState";
import EmptyState from "@/components/ui/EmptyState";
import { getRandomRecipe, getSearchRecipe } from "@/api/recipe/all";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { TypographyH2, TypographyP } from "@/components/ui/Typography";
import { useNavigate } from "react-router";
import { useState } from "react";

function Home() {
  const navigate = useNavigate();
  const [search, setSearch] = useState("");
  const [randomLimit, setRandomLimit] = useState(10);
  const [searchTimeout, setSearchTimeout] = useState<NodeJS.Timeout | null>(
    null
  );

  //search function
  const handleSearch = (words: string) => {
    // Clear the previous timeout if it exists
    if (searchTimeout) {
      clearTimeout(searchTimeout);
    }

    // Set a new timeout to trigger the search after 2000 milliseconds (2 seconds)
    const newSearchTimeout = setTimeout(() => {
      if (words !== "") {
        setSearch(words);
      } else {
        setSearch("");
      }
    }, 2000);

    // Update the searchTimeout state
    setSearchTimeout(newSearchTimeout);
  };

  const { data, isLoading, isError } = useQuery({
    queryKey: ["getRandomRecipe", randomLimit],
    queryFn: () => getRandomRecipe(randomLimit),
    enabled: search === "",
  });
  const {
    data: searchData,
    isLoading: searchIsLoading,
    isError: searchIsError,
  } = useQuery({
    queryKey: ["getSearchRecipe", search],
    queryFn: () => getSearchRecipe(search),
    enabled: search !== "", // Only run when debouncedQuery is not empty
  });
  const dataToDisplay = search !== "" ? searchData?.results :data?.recipes;
  console.log("🚀 ~ Home ~ dataToDisplay:", dataToDisplay);
  console.log(
    "🚀 ~ Home ~ dataToDisplay:",
    (dataToDisplay && dataToDisplay?.length < 1) || isError || searchIsError
  );

  return (
    <>
      <div className="flex w-full max-w-sm items-center space-x-2 ">
        <Input
          type="search"
          placeholder="Search..."
          onChange={(e) => handleSearch(e.target.value)}
        />
      </div>
      <div className="pt-10">
        <TypographyH2>
          {search !== "" ? "Searched results" : "Featured recipes"}
        </TypographyH2>
        <div>
          <div className="flex gap-0.5 flex-wrap justify-center">
            {isLoading || searchIsLoading ? (
              <LoadingState />
            ) : isError ||
              searchIsError ||
              (dataToDisplay && dataToDisplay.length < 1) ? (
              <EmptyState />
            ) : (
              dataToDisplay?.map((item) => (
                <div className="pt-4" key={item.id}>
                  <Card className="w-[250px] h-[480px]">
                    <CardHeader>
                      <CardTitle className="h-[100px]">{item.title}</CardTitle>
                      <img
                        src={item.image}
                        alt={`${item.title} image`}
                        className="w-full object-cover h-[200px]"
                      />
                    </CardHeader>
                    <CardContent>
                      <div className="flex gap-2 items-center">
                        <TypographyP className="font-semibold">
                          Serve:
                        </TypographyP>
                        <TypographyP>{item.servings}</TypographyP>
                      </div>
                      <div className="flex gap-2 items-center">
                        <TypographyP className="font-semibold">
                          Cooking time:
                        </TypographyP>
                        <TypographyP>{item.readyInMinutes} mins</TypographyP>
                      </div>
                    </CardContent>
                    <CardFooter className="flex justify-start pb-2">
                      <Button onClick={() => navigate(`/recipe/${item.id}`)}>
                        Recipe
                      </Button>
                    </CardFooter>
                  </Card>
                </div>
              ))
            )}
            {/* {!searchIsLoading &&
              !isLoading &&
              dataToDisplay?.map((item) => (
                <div className="pt-4" key={item.id}>
                  <Card className="w-[250px] h-[480px]">
                    <CardHeader>
                      <CardTitle className="h-[100px]">{item.title}</CardTitle>
                      <img
                        src={item.image}
                        alt={`${item.title} image`}
                        className="w-full object-cover h-[200px]"
                      />
                    </CardHeader>
                    <CardContent>
                      <div className="flex gap-2 items-center">
                        <TypographyP className="font-semibold">
                          Serve:
                        </TypographyP>
                        <TypographyP>{item.servings}</TypographyP>
                      </div>
                      <div className="flex gap-2 items-center">
                        <TypographyP className="font-semibold">
                          Cooking time:
                        </TypographyP>
                        <TypographyP>{item.readyInMinutes} mins</TypographyP>
                      </div>
                    </CardContent>
                    <CardFooter className="flex justify-start pb-2">
                      <Button onClick={() => navigate(`/recipe/${item?.id}`)}>
                        Recipe
                      </Button>
                    </CardFooter>
                  </Card>
                </div>
              ))} */}
          </div>
          {search === "" &&
            !searchIsLoading &&
            !isLoading &&
            !isError &&
            !searchIsError && (
              <div className="py-4 flex justify-center gap-4">
                <Button
                  variant="secondary"
                  onClick={() => setRandomLimit(randomLimit + 10)}
                >
                  Show more
                </Button>
                {randomLimit > 10 && (
                  <Button
                    variant="secondary"
                    onClick={() => setRandomLimit(randomLimit - 10)}
                  >
                    Show less
                  </Button>
                )}
              </div>
            )}
        </div>
      </div>
    </>
  );
}

export default Home;
