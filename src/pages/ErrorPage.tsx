import { Player } from "@lottiefiles/react-lottie-player";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { TypographyP } from "@/components/ui/Typography";
export default function ErrorPage() {
  return (
    <div className="flex justify-center items-center w-full">
      <Card className="w-[450px]">
        <CardHeader>
          {/* <CardTitle className="text-center">Opps....An error has occured.</CardTitle>

          <div className="flex w-full justify-center py-8 text-destructive">
            <CircleX size={120} />
          </div> */}
          <Player
            src="https://lottie.host/92fa92c0-fb8f-479f-9d18-c8c4794d854a/51IP3HHnlJ.json"
            className="player"
            loop
            autoplay
          />
        </CardHeader>
        <CardContent>
          <TypographyP className="text-center">
           The page you are looking for does not exist
          </TypographyP>
        </CardContent>
      </Card>
    </div>
  );
}
