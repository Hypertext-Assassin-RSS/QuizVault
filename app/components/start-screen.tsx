import { Play } from "lucide-react";
import { useEffect, useState } from "react";
import { User } from "@/app/interface/user";
import { Questionnaire } from "@/app/interface/questionnaire";
import PocketBase from 'pocketbase';

const pb = new PocketBase(process.env.NEXT_PUBLIC_POCKETBASE_API_URL);

interface StartScreenProps {
  onStart: () => void;
}

export default function StartScreen({ onStart }: StartScreenProps) {
  const [user, setUser] = useState<User>();
  const [questionnaire,setQuestionnaire] = useState<Questionnaire>()

  useEffect(() => {
    const fetchUser = async () => {
      const data = await localStorage.getItem('user');
      if (data) {
        setUser(JSON.parse(data));
      }
    }

    fetchUser();
  }, []);

  useEffect(() => {
    const fetchQuestionnaire = async () => {
      if (!user) return;
      try {
        const records = await pb.collection('Questionnaire').getList(1, 1, {
          filter: `grade="${user.grade}"`,
        });
        
        setQuestionnaire(records.items[0] as Questionnaire)
      } catch (error) {
        console.error("Error fetching questionnaire:", error);
      }
    };

    fetchQuestionnaire();
  }, [user]);

  console.log(user);
  console.log(questionnaire);
  

  return (
    <div className="text-center p-8">
      <h1 className="text-4xl font-bold text-gray-800 mb-6">
        {questionnaire?.name}
      </h1>
      <p className="text-gray-600 mb-8">{questionnaire?.description}</p>
      <button
        onClick={onStart}
        className="inline-flex items-center px-6 py-3 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition-colors"
      >
        <Play className="w-5 h-5 mr-2" />
        Start Quiz
      </button>
    </div>
  );
} 