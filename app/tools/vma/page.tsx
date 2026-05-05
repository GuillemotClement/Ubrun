"use client";

import Form from "@/components/Form/Form";
import FormAction from "@/components/Form/FormAction";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { getVmaZone } from "@/lib/services/vma";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import VmaResultRow from "./VmaResultRow";
import { VmaData } from "@/lib/types/calculator";
import FormInputNumber from "@/components/Form/FormInputNumber";

const formSchema = z.object({
  vma: z
    .float32()
    .min(1, "Vma invalide")
    .max(40, "Vma invalide")
    .positive("La Vma doit être positive"),
});

type FormValues = z.infer<typeof formSchema>;

type TypeZone = "race" | "seuil";

export default function VmaPage() {
  // const [vma, setVma] = useState<null | number>(null);
  const [vmaZone, setVmaZone] = useState<VmaData[][]>([]);
  const [selectType, setSelectType] = useState<TypeZone>("seuil");

  const raceVma = vmaZone.length > 0 ? vmaZone[0] : [];
  const zoneVma = vmaZone.length > 0 ? vmaZone[1] : [];

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      vma: undefined,
    },
  });

  const onSubmit = (data: FormValues) => {
    // setVma(data.vma);
    setVmaZone(getVmaZone(data.vma));
  };

  const handleReset = () => {
    setVmaZone([]);
    form.reset();
  };

  return (
    <div className="">
      <Card className="">
        <CardHeader>
          <CardTitle className="text-center mb-2">
            Vitesse Maximale Aérobie
          </CardTitle>
          <CardDescription>
            La VMA correspond à la vitesse de course à partir de laquelle la
            consommation d&apos;oxygène atteint son maximum (VO2max). Elle
            constitue un indicateur clé de la performance en endurance, car elle
            permet de calibrer tes allures d&apos;entraînement. Travailler à des
            pourcentages de sa VMA aide à structurer ces séances, améliorer ses
            capacités cardiovasculaires et optimiser sa progression.
          </CardDescription>
        </CardHeader>
        <CardContent className="">
          <Form onSubmit={form.handleSubmit(onSubmit)} title="Vma">
            <FormInputNumber
              min={0}
              max={40}
              step={0.01}
              name="vma"
              form={form}
              label=""
              placeholder="VMA"
              isRequired={true}
            />
            <FormAction submitText="Calculer" handleReset={handleReset} />
          </Form>
        </CardContent>
      </Card>

      <Card className="">
        <CardHeader>
          <CardTitle className="text-center">Zone VMA</CardTitle>
        </CardHeader>
        <CardContent>
          {vmaZone.length > 0 ? (
            <>
              <div className="">
                <Button type="button" onClick={() => setSelectType("race")}>
                  Course
                </Button>
                <Button type="button" onClick={() => setSelectType("seuil")}>
                  Zone
                </Button>
              </div>
              <div className="">
                {selectType === "seuil"
                  ? zoneVma.map((zone) => (
                      <VmaResultRow key={zone.title} zone={zone} />
                    ))
                  : raceVma.map((zone) => (
                      <VmaResultRow key={zone.title} zone={zone} />
                    ))}
              </div>
            </>
          ) : (
            <p className="text-center mt-10">
              Saisir une VMA pour obtenir les zones
            </p>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
