import React, { useEffect, useState } from "react";
import styled from "styled-components";
import SmallButton from "./SmallButton";
import Plus from "../assets/images/plus.svg";
import Folder from "../assets/images/imageFolder.svg";
import { recipeData } from "../data/MockData";

const EditModal = ({ recipeId, onSave, saveEditModal }) => {
  const [title, setTitle] = useState("");
  const [ingredients, setIngredients] = useState([]);
  const [methods, setMethods] = useState([""]);
  const [image, setImage] = useState(null);

  useEffect(() => {
    const recipe = recipeData.find((item) => item.id === recipeId);
    if (recipe) {
      setTitle(recipe.title || "");
      setIngredients(recipe.ingredients || []);
      setMethods(recipe.methods || []);
      setImage(recipe.image || null);
    }
  }, [recipeId]);

  const handleIngredientChange = (index, value) => {
    const newIngredients = [...ingredients];
    newIngredients[index] = value;
    setIngredients(newIngredients);
  };

  const handleAddIngredient = () => {
    setIngredients([...ingredients, ""]);
  };

  const handleMethodChange = (index, value) => {
    const newMethods = [...methods];
    newMethods[index] = value;
    setMethods(newMethods);
  };

  const handleMethodKeyDown = (index, e) => {
    if (e.key === "Enter") {
      e.preventDefault();
      const newMethods = [...methods];
      newMethods.splice(index + 1, 0, "");
      setMethods(newMethods);
    }
  };

  const handleImageChange = (e) => {
    setImage(URL.createObjectURL(e.target.files[0]));
  };

  const handleSave = () => {
    const updatedRecipe = {
      id: recipeId,
      title,
      ingredients,
      methods,
      image,
    };
    onSave(updatedRecipe);
    saveEditModal();
  };

  return (
    <RecipeModalContainer>
      <ModalBackground>
        <TitleBox>
          <TitleInput
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="음식 이름을 입력하세요"
          />
        </TitleBox>
        <ModalContentBox>
          <TopContainer>
            <ContentContainer>
              <Title>재료</Title>
              <IngredientContainer>
                {ingredients.map((ingredient, index) => (
                  <IngredientInput
                    key={index}
                    type="text"
                    value={ingredient}
                    onChange={(e) =>
                      handleIngredientChange(index, e.target.value)
                    }
                    placeholder={`재료 ${index + 1}`}
                  />
                ))}
                <AddIngredientButton src={Plus} onClick={handleAddIngredient} />
              </IngredientContainer>
            </ContentContainer>
          </TopContainer>
          <ContentContainer>
            <Title>조리 방법</Title>
            {methods.map((method, index) => (
              <MethodTextarea
                key={index}
                value={method}
                onChange={(e) => handleMethodChange(index, e.target.value)}
                onKeyDown={(e) => handleMethodKeyDown(index, e)}
                placeholder="ex) 돼지고기는 핏물을 빼주세요"
              />
            ))}
          </ContentContainer>
          <ContentContainer>
            <Title>사진</Title>
            <UploadImg>
              {image && <img src={image} alt="Preview" />}
              <UploadLabel htmlFor="file-upload">
                <FolderIcon src={Folder} alt="Folder Icon" />
              </UploadLabel>
              <UploadButton
                id="file-upload"
                type="file"
                accept="image/*"
                onChange={handleImageChange}
              />
            </UploadImg>
          </ContentContainer>
        </ModalContentBox>
        <ButtonContainer>
          <SmallButton text="저장" onClick={handleSave} />
        </ButtonContainer>
      </ModalBackground>
    </RecipeModalContainer>
  );
};

const ButtonContainer = styled.div`
  display: flex;
  justify-content: end;
`;

const UploadLabel = styled.label`
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 30px;
  height: 30px;
  margin: 5px;
`;

const FolderIcon = styled.img`
  width: 100%;
  height: 100%;
`;

const UploadImg = styled.div`
  display: flex;
  width: 500px;
  height: 37px;
  border-radius: 10px;
  justify-content: end;
  border: none;
  ${({ theme }) => theme.fonts.default16}
  background-color: ${({ theme }) => theme.colors.white};
  margin: 5px;
`;

const UploadButton = styled.input`
  height: 40px;
  width: 40px;
  margin: 5px;
  opacity: 0;
  position: absolute;
  cursor: pointer;
`;

const TopContainer = styled.div`
  width: 100%;
  height: 250px;
  display: flex;
  justify-content: space-between;
`;

const MethodTextarea = styled.input`
  ${({ theme }) => theme.fonts.default16}
  background-color: ${({ theme }) => theme.colors.white};
  width: 500px;
  height: 37px;
  border-radius: 10px;
  border: none;
  vertical-align: middle;
  margin: 5px;
`;

const IngredientContainer = styled.div`
  display: flex;
  width: 75%;
  flex-wrap: wrap;
`;

const IngredientInput = styled.p`
  ${({ theme }) => theme.fonts.default16}
  background-color: ${({ theme }) => theme.colors.white};
  width: 80px;
  height: 37px;
  border-radius: 10px;
  margin: 5px;
`;

const AddIngredientButton = styled.img`
  width: 25px;
  height: 25px;
  border-radius: 10px;
  margin: 10px;
  cursor: pointer;
`;

const Title = styled.p`
  ${({ theme }) => theme.fonts.default18};
  margin: 5px;

  @media screen and (max-width: 1200px) {
    font-size: 1.5vw;
  }
`;

const ContentContainer = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  padding: 20px;

  @media screen and (max-width: 1200px) {
    height: 42vw;
  }
`;

const ModalContentBox = styled.div`
  background-color: ${({ theme }) => theme.colors.green100};
  width: 725px;
  height: 630px;
  border-radius: 10px;
  margin-bottom: 25px;
  display: flex;
  flex-direction: column;
  justify-content: start;

  @media screen and (max-width: 1200px) {
    width: 50vw;
    height: 45vw;
    border-radius: 0.52vw;
    margin-bottom: 1.5vw;
  }
`;

const TitleBox = styled.div`
  width: 500px;
  height: 40px;
  display: flex;
  justify-content: start;
  margin-bottom: 25px;

  @media screen and (max-width: 1200px) {
    margin-bottom: 1.5vw;
  }
`;

const TitleInput = styled.input`
  ${({ theme }) => theme.fonts.title20}
  background-color: ${({ theme }) => theme.colors.white};
  border: none;
  border-radius: 10px;
  width: 100%;
  height: 50px;
  padding: 0 10px;
  box-sizing: border-box;

  @media screen and (max-width: 1200px) {
    font-size: 1vw;
    height: 3vw;
  }
`;

const ModalBackground = styled.div`
  display: flex;
  flex-direction: column;
  align-content: space-between;

  @media screen and (max-width: 1200px) {
    height: 54.5vw;
  }
`;

const RecipeModalContainer = styled.div`
  background-color: ${({ theme }) => theme.colors.green200};
  width: 800px;
  height: 850px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 10px;
  z-index: 1001;

  @media screen and (max-width: 1200px) {
    width: 57.3vw;
    height: 60vw;
    border-radius: 1vw;
  }
`;

export default EditModal;
