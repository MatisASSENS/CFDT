import React from 'react';
import { motion } from 'framer-motion';
import { Calendar, Download } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useToast } from '@/components/ui/use-toast';

function ReportCard({ title, date, category, summary }) {
  const { toast } = useToast();

  const handleDownload = () => {
    toast({
      title: "🚧 Fonctionnalité en développement",
      description: "Le téléchargement des rapports sera bientôt disponible !",
    });
  };

  const categoryColors = {
    Aviation: 'bg-blue-500',
    Ferroviaire: 'bg-green-500',
    Routier: 'bg-yellow-500',
    Maritime: 'bg-cyan-500'
  };

  return (
    <motion.div
      whileHover={{ scale: 1.02, y: -5 }}
      className="bg-white rounded-xl shadow-lg hover:shadow-2xl transition-all duration-300 overflow-hidden"
    >
      <div className="p-6">
        <div className="flex items-center justify-between mb-3">
          <span className={`inline-block px-3 py-1 ${categoryColors[category] || 'bg-gray-500'} text-white text-xs font-semibold rounded-full`}>
            {category}
          </span>
          <div className="flex items-center text-gray-500 text-sm">
            <Calendar size={16} className="mr-1" />
            {date}
          </div>
        </div>
        <h3 className="text-xl font-bold text-gray-900 mb-3 line-clamp-2">
          {title}
        </h3>
        <p className="text-gray-600 mb-4 line-clamp-3">
          {summary}
        </p>
        <Button 
          onClick={handleDownload}
          className="w-full bg-[#000091] hover:bg-[#E1000F] text-white transition-colors"
        >
          <Download size={18} className="mr-2" />
          Télécharger le rapport PDF
        </Button>
      </div>
    </motion.div>
  );
}

export default ReportCard;