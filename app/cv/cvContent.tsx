import { Badge } from "@/components/ui/badge"

interface Skill {
  [key: string]: string[];
}
interface Category {
  category: string;
  skills: Skill[]; 
}

interface Skills {
  categories: Category[];
}




export default async function SkillBlock() {

  const staticData = await fetch(`https://getalicv.deno.dev`)
  const skills = await staticData.json() as Skills
  console.log(skills)

  return (
    <div className="grid md:grid-cols-3 grid-cols-2   gap-2 space-y-2 md:space-y-0" >
      {skills.categories.map((category) => (
        <div className="flex-1 last:row-span-2" key={category.category}>
          <h2 className="text-neutral-700 font-bold text-xl">{category.category}</h2>
          {category.skills.map((skill) => (
            <div  className="px-2 space-y-2" key={Object.keys(skill)[0]}>
              {Object.entries(skill).map(([skillArea, skillList]) => (
                <div className="space-y-1" key={skillArea}>
                  <h3 className="text-neutral-700 font-medium text-lg">{skillArea}</h3>
                  <ul className="flex flex-wrap px-2 gap-2">
                    {skillList.map((skillItem) => (
                      <li className="gap-2"  key={skillItem}>
                        <Badge variant="outline"> {skillItem}</Badge>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          ))}
        </div>
      ))}
    </div>
  );
}