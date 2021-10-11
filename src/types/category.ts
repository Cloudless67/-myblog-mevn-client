type Category =
    | string
    | {
          name: string;
          children: Category[];
      };

export default Category;
