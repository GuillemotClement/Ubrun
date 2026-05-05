import CardTool from './CardTool'

export type ToolData = {
  id: number,
  title: string,
  description: string
  link: string
}

const ToolsDisplay = () => {
  const toolData = [
    {
      id: 1,
      title: "Convertisseur",
      description: "Convertissez vos km/h en min/km en un clin d'œil.",
      link: "/tools/convertor",
    },
    {
      id: 2,
      title: "Fréquence Cardiaque",
      description: "Estimez votre Fréquence Cardiaque Maximale théorique en quelques secondes. Un point de départ essentiel pour définir vos zones d'entraînement et courir à la bonne intensité",
      link: "/tools/fcm",
    },
    {
      id: 3,
      title: "Prédicteur d'allure",
      description: "Indiquez votre distance cible et votre objectif de temps pour obtenir l'allure précise à tenir. Calculez instantanément votre plan de route pour franchir la ligne d'arrivée exactement comme prévu.",
      link: "/tools/predictor",
    },
    {
      id: 4,
      title: "Calcul de pourcentage",
      description: "L'outil rapide pour convertir votre valeur de référence en zones de travail. Idéal pour savoir exactement à quel rythme courir votre séance d'endurance fondamentale ou vos répétitions au seuil.",
      link: "/tools/purcent"
    },
    {
      id: 5,
      title: "Vitesse Maximal Aérobique",
      description: "Transformez votre résultat de test (Cooper, demi-Cooper, Vameval) en vitesses d'entraînement. Obtenez instantanément vos allures cibles pour le fractionné court, long ou vos sorties au seuil.",
      link: "/tools/vma"
    }
  ];

  return (
    <div className='container mx-auto grid grid-cols-1 place-items-center gap-5 md:grid-cols-2 lg:grid-cols-3'>
      {toolData.map((tool) => <CardTool key={tool.id} data={tool} />)}
    </div>
  )
}

export default ToolsDisplay