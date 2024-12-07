import { useState, useEffect } from 'react';

interface QuestionType {
  name: string;
  imageUrl: string;
}

interface Category {
  name: string;
  href: string;
  icon: string;
  questions: QuestionType[];
}

interface Player {
  name: string;
  image_url: string;
}

interface ApiResponseItem {
  supercategory: string;
  category: string;
  description: string;
  content_array: Player[];
  emoji: string;
}

const useFetchCategories = (supercategory: string, defaultCategories: Category[]) => {
  const [categories, setCategories] = useState<Category[]>(defaultCategories);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    setLoading(true);
    fetch('/api/Questions/')
      .then(response => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then((data: ApiResponseItem[]) => {
        const formattedData: Category[] = data

          .map((item) => ({
            name: item.category,
            href: `/${supercategory}/${item.category.toLowerCase()}`,
            icon: item.emoji,
            questions: item.content_array.map((player: Player) => ({
              name: player.name,
              imageUrl: player.image_url,
            })),
          }));

        const updatedCategories = defaultCategories.map((defaultCategory) => {
          const apiCategory = formattedData.find(
            (category) => category.name === defaultCategory.name
          );
          return apiCategory ? apiCategory : defaultCategory;
        });

        setCategories(updatedCategories);
      })
      .catch(error => {
        setError(error.message);
      })
      .finally(() => {
        setLoading(false);
      });
  }, [supercategory, defaultCategories]);

  return { categories, loading, error };
};

export default useFetchCategories;
