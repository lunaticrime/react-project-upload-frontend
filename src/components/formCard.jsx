import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { Textarea } from "./ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/select";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "./ui/card";

const FormCard = ({ setIsOpen }) => {
  return (
    <div className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-50">
      <Card className="w-xs sm:w-lg md:w-2xl lg:w-3xl dark:bg-blue-1-dark-sec bg-blue-100 max-h-[80vh] flex flex-col">
        <CardHeader>
          <CardTitle>Create project</CardTitle>
          <CardDescription>
            Deploy your new project in one-click.
          </CardDescription>
        </CardHeader>
        <CardContent className="z-100 overflow-y-auto flex-1">
          <form>
            <div className="grid w-full items-center gap-4">
              <div className="flex flex-col space-y-1.5">
                <Label htmlFor="name">Name</Label>
                <Input
                  id="name"
                  placeholder="Name of your project"
                  className="border-blue-1"
                />
              </div>
              <div className="flex flex-col space-y-1.5">
                <Label htmlFor="name">Caption</Label>
                <Input
                  id="caption"
                  placeholder="caption of your project"
                  className="border-blue-1"
                />
              </div>
              <div className="flex flex-col space-y-1.5">
                <Label htmlFor="name">Description</Label>
                <Textarea
                  id="name"
                  placeholder="Describe your project"
                  className="border-blue-1"
                />
              </div>
              <div className="flex flex-col space-y-1.5">
                <Label htmlFor="name">Technologies</Label>
                <Input
                  id="technologies"
                  placeholder="technologies used in your project"
                  className="border-blue-1"
                />
              </div>
              <div className="flex flex-col space-y-1.5">
                <Label htmlFor="name">Duration</Label>
                <Input
                  id="duration"
                  placeholder="Duration of your project"
                  className="border-blue-1"
                />
              </div>
              <div className="flex flex-col space-y-1.5">
                <Label htmlFor="name">Thumbnail</Label>
                <Input id="name" type="file" className="border-blue-1" />
              </div>
              <div className="flex flex-col space-y-1.5">
                <Label htmlFor="name">Source Code</Label>
                <Input id="name" type="file" className="border-blue-1" />
              </div>
              <div className="flex flex-col space-y-1.5 z-100">
                <Label htmlFor="framework">Type</Label>
                <Select onValueChange={(value) => setProjectType(value)}>
                  <SelectTrigger id="framework" className="border-blue-1">
                    <SelectValue placeholder="Select project type" />
                  </SelectTrigger>
                  <SelectContent position="popper">
                    <SelectItem value="Internship">Internship</SelectItem>
                    <SelectItem value="Course">Course</SelectItem>
                    <SelectItem value="Other">Other</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              {(projectType === "Internship" || projectType === "Course") && (
                <div className="flex flex-col space-y-1.5">
                  <Label htmlFor="prof">Professor/Supervisor</Label>
                  <Input
                    id="prof"
                    placeholder="Enter professor/supervisor name"
                    className="border-blue-1"
                  />
                </div>
              )}
            </div>
          </form>
        </CardContent>
        <CardFooter className="flex justify-between">
          <Button
            variant="outline"
            asChild
            className="cursor-pointer bg-blue-50"
          >
            <span onClick={() => setIsOpen(false)}>Cancel</span>
          </Button>
          <Button className="cursor-pointer bg-blue-1 dark:bg-blue-50 hover:bg-blue-2 dark:hover:bg-blue-200">
            Deploy
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
};

export default FormCard;
