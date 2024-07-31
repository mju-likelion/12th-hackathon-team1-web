import React, { useEffect, useState } from "react";
import styled from "styled-components";
import SmallButton from "./SmallButton";
import Plus from "../assets/images/plus.svg";
import Folder from "../assets/images/imageFolder.svg";
import RecipeIngredient from "./RecipeIngredient";
import { Axios } from "../api/Axios";

const EditModal = ({ recipeId, onSave, closeEditModal }) => {
  const [title, setTitle] = useState("");
  const [ingredients, setIngredients] = useState([{ name: "", id: null }]);
  const [methods, setMethods] = useState([""]);
  const [imageId, setImageId] = useState(null);
  const [showIngredientBox, setShowIngredientBox] = useState(false);
  const [activeIngredientIndex, setActiveIngredientIndex] = useState(null);
  const [showIngredientOptions, setShowIngredientOptions] = useState(false);

  useEffect(() => {
    const fetchRecipe = async () => {
      try {
        const response = await Axios.get(`/recipes/${recipeId}`);
        const recipe = response.data.data;

        if (recipe) {
          setTitle(recipe.name || "");
          setIngredients(
            recipe.ingredientRecipes.map((ing) => ({
              name: ing.ingredient.name,
              id: ing.ingredient.id,
            })) || []
          );
          setMethods(
            recipe.cookingStep ? recipe.cookingStep.split(". ") : [""]
          );
          setImageId(recipe.image && recipe.image.id ? recipe.image.id : null);
        } else {
          console.error("레시피 데이터가 없습니다.");
        }
      } catch (error) {
        console.error("레시피를 가져오는 데 실패했습니다.", error);
      }
    };

    if (recipeId) {
      fetchRecipe();
    }
  }, [recipeId]);

  const handleIngredientSelect = async (recipe) => {
    const ingredient = recipe.ingredientRecipes;

    if (activeIngredientIndex !== null) {
      const newIngredients = [...ingredients];
      newIngredients[activeIngredientIndex] = {
        name: ingredient.name,
        id: ingredient.id,
      };
      setIngredients(newIngredients);

      try {
        await Axios.post(`/recipes/${recipeId}/ingredients`, {
          ingredients: [ingredient.id],
        });
      } catch (error) {
        console.error("재료를 추가하는 데 실패했습니다.", error);
      }
    } else {
      setIngredients([
        ...ingredients,
        {
          name: ingredient.name,
          id: ingredient.id,
        },
      ]);
    }

    setActiveIngredientIndex(null);
    setShowIngredientBox(false);
  };

  const handleIngredientChange = (index, value) => {
    const newIngredients = [...ingredients];
    newIngredients[index] = {
      ...newIngredients[index],
      name: value,
    };
    setIngredients(newIngredients);
  };

  const handleAddIngredient = () => {
    setIngredients([...ingredients, { name: "", id: null }]);
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
    setImageId(URL.createObjectURL(e.target.files[0]));
  };

  const handleSave = async () => {
    const updatedRecipe = {
      name: title,
      cookingStep: methods.join(". "),
      imageId,
    };

    try {
      await Axios.patch(`/recipes/${recipeId}`, updatedRecipe);
      onSave({ updatedRecipe, id: recipeId });
      closeEditModal();
      window.location.reload();
    } catch (error) {
      console.error("레시피를 저장하는 데 실패했습니다.", error);
    }
  };

  const handleIngredientClick = (index, event) => {
    setActiveIngredientIndex(index);
    setShowIngredientOptions(true);
  };

  const IngredientOptionsDropdown = ({
    onRegister,
    onDelete,
    closeOptions,
  }) => (
    <DropdownContainer>
      <DropdownButton
        onClick={() => {
          onRegister();
          closeOptions();
        }}
      >
        등록
      </DropdownButton>
      <DropdownButton
        onClick={() => {
          onDelete();
          closeOptions();
        }}
      >
        삭제
      </DropdownButton>
    </DropdownContainer>
  );

  const handleDeleteIngredient = async (index) => {
    const ingredientToDelete = ingredients[index];

    if (!ingredientToDelete || !ingredientToDelete.id) {
      console.error("삭제할 재료의 ID가 없습니다.");
      return;
    }

    /*
    -> 재료 등록/삭제 시 받는 ID 변경 가능한지 문의한 상태. 이후 확인 되면 로직 삭제 예정
    console.log("레시피 ID: ", recipeId);
    console.log("삭제할 재료 정보:", ingredientToDelete);
    console.log("삭제할 재료 ID:", ingredientToDelete.id);
    */

    try {
      await Axios.delete(`/recipes/${recipeId}/ingredients`, {
        data: {
          ingredientRecipeIds: [ingredientToDelete.id],
        },
      });
      setIngredients((prev) => prev.filter((_, i) => i !== index));
    } catch (error) {
      console.error("재료 삭제에 실패했습니다.", error);
    }
  };

  return (
    <EditModalContainer>
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
              <TitleContainer>
                <Title>재료</Title>
                {showIngredientOptions && (
                  <IngredientOptionsDropdown
                    onRegister={() => setShowIngredientBox(true)}
                    onDelete={() =>
                      handleDeleteIngredient(activeIngredientIndex)
                    }
                    closeOptions={() => setShowIngredientOptions(false)}
                  />
                )}
              </TitleContainer>
              <IngredientContainer>
                {Array.isArray(ingredients) &&
                  ingredients.map((ingredient, index) => (
                    <IngredientInput
                      key={index}
                      type="text"
                      value={ingredient.name}
                      onClick={(e) => handleIngredientClick(index, e)}
                      onChange={(e) =>
                        handleIngredientChange(index, e.target.value)
                      }
                      placeholder={`재료 ${index + 1}`}
                    >
                      {ingredient.name}
                    </IngredientInput>
                  ))}
                {showIngredientBox && (
                  <RecipeIngredient
                    closeIngredientBox={() => setShowIngredientBox(false)}
                    onIngredientSelect={handleIngredientSelect}
                  />
                )}
                <AddIngredientButton src={Plus} onClick={handleAddIngredient} />
              </IngredientContainer>
            </ContentContainer>
          </TopContainer>
          <ContentContainer>
            <Title>조리 방법</Title>
            {Array.isArray(methods) &&
              methods.map((method, index) => (
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
              {imageId && <img src={imageId} alt="Preview" />}
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
          <SmallButton text="닫기" onClick={closeEditModal} />
          <SmallButton text="저장" onClick={handleSave} />
        </ButtonContainer>
      </ModalBackground>
    </EditModalContainer>
  );
};

const TitleContainer = styled.div`
  display: flex;
`;

const ButtonContainer = styled.div`
  display: flex;
  justify-content: space-between;
  width: 50%;
  margin-left: auto;
`;

const UploadLabel = styled.label`
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 30px;
  height: 30px;
  margin: 5px;

  @media screen and (max-width: 1200px) {
    width: 2.08vw;
    height: 2.08vw;
    margin: 0.35vw;
  }
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

  @media screen and (max-width: 1200px) {
    width: 34.7vw;
    height: 2.56vw;
    border-radius: 0.7vw;
    margin: 0.35vw;
  }
`;

const UploadButton = styled.input`
  height: 40px;
  width: 40px;
  margin: 5px;
  opacity: 0;
  position: absolute;
  cursor: pointer;

  @media screen and (max-width: 1200px) {
    height: 2.77vw;
    width: 2.77vw;
    margin: 0.35vw;
  }
`;

const TopContainer = styled.div`
  width: 100%;
  height: 250px;
  display: flex;
  justify-content: space-between;

  @media screen and (max-width: 1200px) {
    height: 17.36vw;
  }
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

  &:focus {
    outline: none;
  }

  @media screen and (max-width: 1200px) {
    font-size: 1.3vw;
    width: 34.7vw;
    height: 2.56vw;
    border-radius: 0.7vw;
    margin: 0.35vw;
  }
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
  cursor: pointer;
  display: flex;
  justify-content: center;
  align-items: center;

  @media screen and (max-width: 1200px) {
    font-size: 1.1vw;
    width: 5.55vw;
    height: 2.56vw;
    border-radius: 0.7vw;
    margin: 0.35vw;
  }
`;

const AddIngredientButton = styled.img`
  width: 25px;
  height: 25px;
  border-radius: 10px;
  margin: 10px;
  cursor: pointer;

  @media screen and (max-width: 1200px) {
    width: 1.4vw;
    height: 1.4vw;
    border-radius: 0.7vw;
    margin: 0.7vw;
  }
`;

const Title = styled.p`
  ${({ theme }) => theme.fonts.default18};
  margin: 5px;

  @media screen and (max-width: 1200px) {
    font-size: 1.5vw;
    margin: 0.35vw;
  }
`;

const ContentContainer = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  padding: 20px;

  @media screen and (max-width: 1200px) {
    padding: 1.4vw;
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
  display: flex;
  justify-content: start;
  align-items: center;
  margin: 60px 0 10px 0;

  @media screen and (max-width: 1200px) {
    margin: 4.16vw 0 0.7vw 0;
  }
`;

const TitleInput = styled.input`
  ${({ theme }) => theme.fonts.title20}
  background-color: ${({ theme }) => theme.colors.white};
  border: none;
  border-radius: 10px;
  width: 450px;
  height: 50px;
  padding: 0 10px;
  box-sizing: border-box;

  &:focus {
    outline: none;
  }

  @media screen and (max-width: 1200px) {
    font-size: 1vw;
    width: 30vw;
    height: 3vw;
    border-radius: 0.7vw;
  }
`;

const ModalBackground = styled.div`
  width: 725px;
  height: 850px;
  display: flex;
  flex-direction: column;
  align-content: space-between;

  @media screen and (max-width: 1200px) {
    width: 50vw;
    height: 60vw;
  }
`;

const EditModalContainer = styled.div`
  background-color: ${({ theme }) => theme.colors.green200};
  width: 800px;
  height: 850px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 10px;
  z-index: 1200;

  @media screen and (max-width: 1200px) {
    width: 57.3vw;
    height: 60vw;
    border-radius: 1vw;
  }
`;

const DropdownContainer = styled.div`
  display: flex;
  justify-content: center;
  background-color: ${({ theme }) => theme.colors.green100};
  border: 1px solid ${({ theme }) => theme.colors.helperText};
  border-radius: 7px;
  z-index: 1000;
`;

const DropdownButton = styled.button`
  background: none;
  border: none;
  padding: 5px 7px;
  cursor: pointer;
  ${({ theme }) => theme.fonts.helpText14};

  &:hover {
    background-color: ${({ theme }) => theme.colors.green200};
  }
`;

export default EditModal;
