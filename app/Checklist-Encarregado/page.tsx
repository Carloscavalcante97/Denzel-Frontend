"use client";

import { useState } from "react";
import { ChevronDown, ChevronUp, ArrowUp, Settings, Check } from "lucide-react";
import Image from "next/image";
import extraviadoIcon from "@/public/Extraviado.svg";
import avariadoIcon from "@/public/Avariado.svg";
import emUsoIcon from "@/public/Em-Uso.svg";
import todosIcon from "@/public/Todos.svg";
import quantidadeIcon from "@/public/quantidade.svg";


interface Material {
  id: string;
  status: string;
}

interface Grupo {
  nome: string;
  quantidade: number;
  materiais: Material[];
}

const materiaisExemplo: Grupo[] = [
  {
    nome: "Bola de Grid Q50 Completa | 6X6",
    quantidade: 20,
    materiais: [],
  },
  {
    nome: "Lona Transparente House Mix | 4,50 x 2,50",
    quantidade: 3,
    materiais: [
      { id: "0000001", status: "Extraviado" },
      { id: "0000002", status: "Avariado" },
      { id: "0000003", status: "Em Uso" },
    ],
  },
];

const getStatusStyle = (status: string) => {
  switch (status) {
    case "Extraviado":
      return "text-yellow-400";
    case "Avariado":
      return "text-red-500";
    case "Em Uso":
      return "text-blue-400";
    default:
      return "text-gray-300";
  }
};

const getStatusIcon = (status: string) => {
  switch (status) {
    case "Extraviado":
      return extraviadoIcon;
    case "Avariado":
      return avariadoIcon;
    case "Em Uso":
      return emUsoIcon;
    default:
      return undefined;
  }
};

export default function ChecagemMateriais() {
  const [aberto, setAberto] = useState<Record<string, boolean>>({});

  const toggleAccordion = (nome: string) => {
    setAberto((prev) => ({ ...prev, [nome]: !prev[nome] }));
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <div className="min-h-screen bg-[#100D1E] text-white p-4 pb-32">
      <div className="mb-4">
        <div className="flex items-center bg-[#2D2342] rounded-lg px-3 py-2">
          <input
            type="text"
            placeholder="Buscar Materiais"
            className="flex-1 bg-transparent text-white placeholder-gray-400 outline-none"
          />
          <button className="ml-2 text-white text-xs border border-white rounded px-3 py-1">
            Filtrar
          </button>
        </div>
      </div>

      <div className="bg-[#2D2342] rounded-lg p-2 mb-4">
        <div className="flex items-center gap-2 text-white font-semibold border-b border-[#443C61] pb-2 mb-2">
          <Settings className="w-4 h-4" />
          <span>Estrutura (300)</span>
        </div>

        {materiaisExemplo.map((grupo) => (
          <div key={grupo.nome} className="bg-[#1B1325] mb-3 rounded border border-[#443C61]">
            <div
              className="flex justify-between items-center px-4 py-3 cursor-pointer"
              onClick={() => toggleAccordion(grupo.nome)}
            >
              <div className="flex items-center gap-2">
                <input type="checkbox" className="accent-purple-500" />
                <span className="font-semibold text-sm">{grupo.nome}</span>
              </div>
              {aberto[grupo.nome] ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
            </div>

            <div className="flex gap-2 px-4 pb-2 text-xs text-white">
              <div className="flex items-center gap-1">
                <Image src={quantidadeIcon} alt="qtd" width={14} height={14} /> {grupo.quantidade}
              </div>
              <div className="flex items-center gap-1">
                <Image src={todosIcon} alt="todos" width={14} height={14} /> (Todos)
              </div>
            </div>

            {aberto[grupo.nome] && grupo.materiais.length > 0 && (
              <div className="bg-[#2D2342] mx-3 mb-3 rounded-md p-3 text-sm">
                {grupo.materiais.map((material) => (
                  <div key={material.id} className="flex justify-between items-center mb-2">
                    <div className="flex items-center gap-2">
                      <input type="checkbox" className="accent-purple-500" />
                      <span
                        className={`text-sm ${material.status === 'Em Uso' ? 'text-red-400 font-bold' : 'text-white'}`}
                      >
                        Id {material.id}
                      </span>
                    </div>
                    <div className="flex items-center gap-1">
                      {getStatusIcon(material.status) && (
                        <Image src={getStatusIcon(material.status)!} alt={material.status} width={14} height={14} />
                      )}
                      <span className={`text-xs font-medium ${getStatusStyle(material.status)}`}>
                        {material.status}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Botão "Finalizar Checagem" com seta azul */}
      <div className="fixed bottom-24 left-0 w-full px-4 z-50 flex justify-center">
  <div className="relative ">
    <button
      className="w-[216px] h-[40px] flex items-center justify-center gap-2 border border-white text-white rounded-full text-sm font-medium bg-transparent hover:bg-white/10 transition"
    >
      <Check className="w-4 h-4" />
      Finalizar Checagem
    </button>
    <button
      onClick={scrollToTop}
      className="absolute -right-12 top-0 w-[40px] h-[40px] rounded-full bg-[#43A3D5] flex items-center justify-center shadow-md"
    >
      <ArrowUp className="text-white" size={20} />
    </button>
  </div>
</div>



      {/* Botão "Gerenciar" abaixo */}
      <div className="fixed bottom-4 left-0 w-full px-4 z-40 flex justify-center">
  <button
    className="w-[135px] h-[40px] border border-white text-white rounded-full font-semibold bg-transparent hover:bg-white/10 flex items-center justify-center gap-2 transition"
  >
    <Settings className="w-4 h-4" />
    Gerenciar
  </button>
</div>


    </div>
  );
}
