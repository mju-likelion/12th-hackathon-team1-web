import React, { useState } from "react";
import styled from "styled-components";
import SmallButton from "./SmallButton";
import Plus from "../assets/images/plus.svg";
import Folder from "../assets/images/imageFolder.svg";
import Cancel from "../assets/images/x.svg";
import DeleteIcon from "../assets/images/x.svg";
import RecipeIngredient from "./RecipeIngredient";
import { Axios } from "../api/Axios";

const CreateModal = ({ onSave, saveCreateModal }) => {
  const [title, setTitle] = useState("");
  const [ingredients, setIngredients] = useState([]);
  const [ingredientIds, setIngredientIds] = useState([]);
  const [methods, setMethods] = useState("");
  const [showIngredientBox, setShowIngredientBox] = useState(false);
  const [activeIngredientIndex, setActiveIngredientIndex] = useState(null);
  const [imageFile, setImageFile] = useState(null);

  const handleIngredientSelect = (ingredient) => {
    if (activeIngredientIndex !== null) {
      const newIds = [...ingredientIds];
      newIds[activeIngredientIndex] = ingredient.id;
      const newIngredients = [...ingredients];
      newIngredients[activeIngredientIndex] = ingredient.name;
      setIngredients(newIngredients);
      setIngredientIds(newIds);
    } else {
      setIngredientIds([...ingredientIds, ingredient.id]);
      setIngredients([...ingredients, ingredient.name]);
    }
    setActiveIngredientIndex(null);
    setShowIngredientBox(false);
  };

  const handleIngredientChange = (index, value) => {
    const newIngredients = [...ingredients];
    newIngredients[index] = value;
    setIngredients(newIngredients);
  };

  const handleAddIngredient = () => {
    setIngredients([...ingredients, ""]);
  };

  const handleMethodChange = (e) => {
    setMethods(e.target.value);
  };

  const handleImageChange = async (e) => {
    const image = e.target.files[0];
    if (image) {
      setImageFile(image);
    }
  };

  const handleDeleteImage = async () => {
    setImageFile(null);
  };

  const handleIngredientDelete = (index, e) => {
    e.stopPropagation();
    const newIngredients = ingredients.filter((_, i) => i !== index);
    const newIngredientIds = [...ingredientIds];
    newIngredients.splice(index, 1);
    newIngredientIds.splice(index, 1);
    setIngredients(newIngredients);
    setIngredientIds(newIngredientIds);
    setShowIngredientBox(false);
  };

  const validateForm = () => {
    if (!title.trim()) {
      alert("음식 이름을 입력하세요.");
      return false;
    }
    if (
      ingredients.length === 0 ||
      ingredients.some((ingredient) => !ingredient.trim())
    ) {
      alert("재료를 입력하세요.");
      return false;
    }
    if (!methods.trim()) {
      alert("조리 방법을 입력하세요.");
      return false;
    }
    return true;
  };

  const handleSave = async () => {
    if (!validateForm()) return;

    const newRecipe = {
      name: title,
      ingredientIds: ingredientIds,
      cookingStep: methods.split("\n").join(". "),
    };

    if (imageFile) {
      const formData = new FormData();
      formData.append("file", imageFile);

      try {
        const response = await Axios.post("recipes/images", formData, {
          headers: { "Content-Type": "multipart/form-data" },
        });

        console.log(response);
        if (response.data.statusCode === "200") {
          newRecipe.imageId = response.data.data.id;
        } else {
          console.error("이미지 등록에 실패했습니다.");
          return;
        }
      } catch (error) {
        console.error("이미지 등록 중 오류 발생", error);
        return;
      }
    }

    try {
      await Axios.post("/recipes", newRecipe);
      onSave(newRecipe);
      saveCreateModal();
      window.location.reload();
    } catch (error) {
      console.error("Error saving recipe:", error);
      alert("레시피를 저장하는 중에 오류가 발생했습니다. 다시 시도해주세요.");
    }
  };

  return (
    <CreateModalContainer>
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
                    onClick={() => {
                      setActiveIngredientIndex(index);
                      setShowIngredientBox(true);
                    }}
                    onChange={(e) =>
                      handleIngredientChange(index, e.target.value)
                    }
                    placeholder={`재료 ${index + 1}`}
                  >
                    <IngredientName>
                      {ingredient.length > 6
                        ? ingredient.slice(0, 6) + "..."
                        : ingredient}
                    </IngredientName>
                    <CancelButton
                      src={Cancel}
                      alt="재료 삭제 버튼"
                      onClick={handleIngredientDelete}
                    />
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
            <MethodTextarea
              value={methods}
              onChange={handleMethodChange}
              placeholder="ex) 돼지고기는 핏물을 빼주세요"
            />
          </ContentContainer>
          <ContentContainer>
            <Title>사진</Title>
            <UploadImg>
              <ImageContainer>
                {imageFile && (
                  <ImageContainer>
                    <ImagePreview
                      src={URL.createObjectURL(imageFile)}
                      alt="업로드한 이미지"
                    />
                    <DeleteButton
                      src={DeleteIcon}
                      onClick={handleDeleteImage}
                    />
                  </ImageContainer>
                )}
              </ImageContainer>
              {!imageFile && (
                <>
                  <UploadLabel htmlFor="file-upload">
                    <FolderIcon src={Folder} alt="파일 불러오기" />
                  </UploadLabel>
                  <UploadButton
                    id="file-upload"
                    type="file"
                    accept="image/*"
                    onChange={handleImageChange}
                  />
                </>
              )}
            </UploadImg>
          </ContentContainer>
        </ModalContentBox>
        <ButtonContainer>
          <SmallButton text="닫기" onClick={saveCreateModal} />
          <SmallButton text="저장" onClick={handleSave} />
        </ButtonContainer>
      </ModalBackground>
    </CreateModalContainer>
  );
};

const ImageContainer = styled.div`
  display: flex;
  margin: 10px;
`;

const ButtonContainer = styled.div`
  display: flex;
  justify-content: space-between;
  width: 50%;
  margin-left: auto;
`;

const ImagePreview = styled.img`
  height: 300px;
  width: 350px;
  border-radius: 10px;
  object-fit: cover;

  @media screen and (max-width: 1200px) {
    height: 15vw;
    width: 18vw;
    border-radius: 0.7vw;
  }
`;

const DeleteButton = styled.img`
  width: 20px;
  height: 20px;
  cursor: pointer;
  margin-left: 10px;
`;

const UploadLabel = styled.label`
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 30px;
  height: 30px;
  margin: 30px;

  @media screen and (max-width: 1200px) {
    width: 2.08vw;
    height: 2.08vw;
    margin: 2.08vw;
  }
`;

const FolderIcon = styled.img`
  width: 100%;
  height: 100%;
`;

const UploadImg = styled.div`
  display: flex;
  align-items: center;
  width: 500px;
  min-height: 37px;
  border-radius: 10px;
  justify-content: center;
  border: none;
  ${({ theme }) => theme.fonts.default16}
  background-color: ${({ theme }) => theme.colors.white};
  margin: 5px;

  @media screen and (max-width: 1200px) {
    width: 34.7vw;
    min-height: 2.56vw;
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
  display: flex;
  justify-content: space-between;

  @media screen and (max-width: 1200px) {
    height: 17.36vw;
  }
`;

const MethodTextarea = styled.textarea`
  ${({ theme }) => theme.fonts.default16}
  background-color: ${({ theme }) => theme.colors.white};
  width: 500px;
  height: 100px;
  border-radius: 10px;
  border: none;
  margin: 5px;
  padding: 10px;
  resize: vertical;
  overflow: auto;

  &:focus {
    outline: none;
  }

  @media screen and (max-width: 1200px) {
    font-size: 1.3vw;
    width: 34.7vw;
    height: 7vw;
    border-radius: 0.7vw;
    margin: 0.35vw;
  }
`;

const IngredientContainer = styled.div`
  display: flex;
  width: 75%;
  flex-wrap: wrap;
`;

const IngredientName = styled.p`
  ${({ theme }) => theme.fonts.default16};
  margin: 5px;
`;

const IngredientInput = styled.div`
  background-color: ${({ theme }) => theme.colors.white};
  width: 120px;
  height: 37px;
  border-radius: 10px;
  margin: 5px;
  cursor: pointer;
  display: flex;
  justify-content: end;
  align-items: center;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  cursor: default;

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
  overflow-y: auto;

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

const CreateModalContainer = styled.div`
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

const CancelButton = styled.img`
  width: 20px;
  height: 20px;
  cursor: pointer;
  margin: 5px;
`;

export default CreateModal;
