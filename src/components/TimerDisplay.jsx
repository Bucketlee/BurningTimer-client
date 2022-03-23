import React from "react";
import styled from "@emotion/styled";
import PropTypes from "prop-types";

import CountTimer from "./CountTimer";
import Documentation from "./Documentation";

export default function TimerDisplay({ onTimerStart, onTimerPause, onTimerStop, onSaveMemo, onSaveDistraction  }) {
  return(
    <TimerDisplayWrapper>
      <CountTimerWrapper>
        <CountTimer
          onTimerStart={onTimerStart}
          onTimerPause={onTimerPause}
          onTimerStop={onTimerStop}
        />
      </CountTimerWrapper>
      <DocumentationWrapper>
        <Documentation
          title={"Memo"}
          subTitle={"할일 등 무엇이든 자유롭게 메모하세요"}
          defaultContent={{
            "blocks": [
              {
                  "id": "oUq2g_tl8y",
                  "type": "paragraph",
                  "data": {
                    "text": "클릭하여 메모를 작성할 수 있습니다."
                  }
              },
            ],
          }}
          onHandleSave={onSaveMemo}
        />
      </DocumentationWrapper>
      <DocumentationWrapper>
        <Documentation
          title={"Distraction"}
          subTitle={"딴짓은 이곳에 적어두고 본짓에 집중하세요"}
          defaultContent={{
            "blocks": [
              {
                  "id": "oUq2g_tl8y",
                  "type": "paragraph",
                  "data": {
                    "text": "클릭하여 딴짓을 작성할 수 있습니다."
                  }
              },
            ],
          }}
          onHandleSave={onSaveDistraction}
        />
      </DocumentationWrapper>
    </TimerDisplayWrapper>
  );
}

const TimerDisplayWrapper = styled.div`
  height: 100%;
  display: grid;
  grid-template-columns: 600px 1fr 1fr;
  grid-auto-columns: auto;
`

const CountTimerWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
`

const DocumentationWrapper = styled.div`
  padding: 30px;
  border-left: 1px solid #F2F2F2;

  &:focus-within {
    min-width: 400px;
  }
`

TimerDisplay.propTypes = {
  onClickOtherSite: PropTypes.func,
};
