import React, { useRef, useCallback, useEffect } from "react";
import styled from "@emotion/styled";
import { createReactEditorJS } from "react-editor-js";
import Header from "@editorjs/header";
import Paragraph from "@editorjs/paragraph";
import CheckList from "@editorjs/checklist";

const ReactEditorJS = createReactEditorJS();

const EDITOR_JS_TOOLS = {
  header: {
    class: Header,
    inlineToolbar: true,
    shortcut: "CMD+SHIFT+H",
  },
  paragraph: { class: Paragraph, inlineToolbar: true },
  checkList: {
    class: CheckList,
    inlineToolbar: true,
  },
};

const defaultValue = {
  title: "타이틀",
  subTitle: "메모 등 자유롭게 입력하세요.",
  defaultContent: {
    "blocks": [
       {
          "id": "oUq2g_tl8y",
          "type": "header",
          "data": {
             "text": "이곳에 작성하세요.",
             "level": 3
          }
       },
       {
          "id": "zbGZFPM-iI",
          "type": "paragraph",
          "data": {
             "text": "클릭하여 간단하게 작성할 수 있습니다."
          }
       },
      ],
  }
}

export default function Documentation({ title, subTitle, defaultContent, onHandleSave }) {
  const editorCore = useRef(null);

  const handleInitialize = useCallback(async (instance) => {
    editorCore.current = instance;
  }, []);

  const handleSave = useCallback(async () => {
    const savedData = await editorCore.current.save();
    console.log("savedData", savedData);
    onHandleSave(savedData);
  }, [onHandleSave]);

  useEffect(() => {
    return () => {
      handleSave();
    }
  }, [handleSave]);

  return (
    <DocumentationWrapper>
      <TitleWrapper>{title}</TitleWrapper>
      <SubTitleWrapper>{subTitle}</SubTitleWrapper>
      <ContentWrapper>
        <ReactEditorJS defaultValue={defaultContent ? defaultContent : defaultValue} tools={EDITOR_JS_TOOLS} onInitialize={handleInitialize} />
      </ContentWrapper>
    </DocumentationWrapper>
  );
}

const DocumentationWrapper = styled.div`
  width: 100%;
  height: 100%;
`

const TitleWrapper = styled.h2`
  margin: 0;
  font-size: 24px;
  color: #27251F;
`

const SubTitleWrapper = styled.h3`
  margin-bottom: 30px;
  font-size: 18px;
  color: #797978;
`

const ContentWrapper = styled.div`
  border-top: 1px solid #F2F2F2;
  padding: 5px;

  .codex-editor__redactor {
    padding-bottom: 0 !important;
  }
`