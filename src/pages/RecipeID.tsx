import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  TypographyH2,
  TypographyH4,
  TypographyP,
} from "@/components/ui/Typography";
import { MoveLeft } from "lucide-react";
import { useNavigate, useParams } from "react-router";
import { useQuery } from "@tanstack/react-query";
import { getOneRecipe } from "@/api/recipe/id";
import LoadingState from "@/components/ui/LoadingState";
import EmptyState from "@/components/ui/EmptyState";

export default function RecipeID() {
  const { id } = useParams();
  const navigate = useNavigate();

  const { data, isLoading, isError } = useQuery({
    queryKey: ["getRandomRecipe", id],
    queryFn: () => getOneRecipe(id as string),
  });

  const summary = data?.summary || "";

  //   const {
  //     title,
  //     dishTypes,
  //     image,
  //     extendedIngredients,
  //     readyInMinutes,
  //     servings,
  //     analyzedInstructions,
  //   } = recipeData;
  const instruction = data?.analyzedInstructions[0]?.steps;

  if (isLoading) {
    return (
      <>
        <LoadingState />
      </>
    );
  } else if (isError) {
    return (
      <>
        <EmptyState />
      </>
    );
  } else {
    return (
      <>
        <Button
          onClick={() => navigate("/")}
          variant="secondary"
          className="my-4"
        >
          <MoveLeft className="pr-2" />
          Go back
        </Button>
        <TypographyH2>{data?.title}</TypographyH2>
        <div className="flex gap-2">
          <TypographyH4>Serve : </TypographyH4>
          <TypographyH4>{data?.servings}</TypographyH4>
        </div>
        <div className="flex gap-2">
          <TypographyH4>Cooking time : </TypographyH4>
          <TypographyH4>{data?.readyInMinutes} mins</TypographyH4>
        </div>

        <div className="my-2 flex gap-2 flex-wrap capitalize">
          {data?.dishTypes.map((item) => (
            <Badge>{item}</Badge>
          ))}
        </div>
        <img
          className="w-full h-auto min-h-[350px] mt-4 object-cover rounded-md"
          src={data?.image}
          alt={`${data?.title} image`}
        />
        <TypographyH4 className="mt-4">Summary</TypographyH4>
        <TypographyP>
          <div dangerouslySetInnerHTML={{ __html: summary }} />
        </TypographyP>
        <TypographyH4 className="mt-4"> Ingredients</TypographyH4>
        <ul className="list-disc ml-8 ">
          {data?.extendedIngredients.map((item) => (
            <li className="pb-2">{item.original}</li>
          ))}
        </ul>
        <TypographyH4 className="mt-4">Steps</TypographyH4>
        <ol className=" ml-4">
          {instruction?.map((item, index) => (
            <div className="flex gap-1">
              <li className="font-semibold">{index + 1}.</li>
              <li className="pb-2">{item.step}</li>
            </div>
          ))}
        </ol>
      </>
    );
  }
}
