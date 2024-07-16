# 12th-hackathon-team1-web

멋쟁이 사자처럼 12기 중앙 해커톤 웹 1조

## 📠Convention

### 🤝Branch Naming Convention
| 머릿말       | 설명                                            |
| ---------- | ---------------------------------------------- |
| main       | 서비스 브랜치                                      |
| develop    | 배포 전 작업 기준 브랜치                             |
| fix/~      | 작업 중 많은 수정 사항이 생겼을 때 수정하기 위한 브랜치     |
| feature/ ~ | 기능 단위 구현 브랜치                               |
| hotfix/ ~  | 서비스 중 긴급 수정 건에 대한 처리                     |
| api/ ~     | api 연결

<details>
<summary>Branch Naming Convention Detail</summary>
<div markdown="1">

#### main
- [ ] 실제 서비스가 이루어지는 브랜치입니다.
- [ ] 이 브랜치를 기준으로 develop 브랜치가 분기됩니다.
- [ ] 배포 중, 긴급하게 수정할 건이 생길시 hotfix 브랜치를 만들어 수정합니다.

#### develop
- [ ] 개발, 테스트, 릴리즈 등 배포 전 작업의 기준이 되는 브랜치입니다.
- [ ] 해당 브랜치를 default로 설정합니다.
- [ ] 이 브랜치에서 feature 브랜치가 분기됩니다.

#### feature
- [ ] 개별 개발자가 맡은 작업을 개발하는 브랜치입니다.
- [ ] feature/(feature-name) 과 같이 머릿말을 feature, 꼬릿말을 개발하는 기능으로 명명합니다.
- [ ] feature-name의 경우 cabab-case를 따릅니다.
- [ ] ex) feature/login-validation

#### hotfix
- [ ] 서비스 중 긴급히 수정해야 할 사항이 발생할 때 사용합니다.
- [ ] main에서 분기됩니다.

</div>
</details>

### 🤝Commit Convention
| 머릿말       | 설명                                            |
| ---------- | ---------------------------------------------- |
| feat:      | 기능 구현, 추가                                   |
| setting:   | 패키지 설치, 개발 설정                              |
| fix:       | 버그 수정, 예외 케이스 대응, 기능 개선                 |
| rename:    | 파일 혹은 폴더명을 수정하거나 옮기는 작업만인 경우         |
| chore:     | 기타 작업                                        |

