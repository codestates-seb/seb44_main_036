package com.codestates.server.projectLike.service;

import com.codestates.server.exception.BusinessLogicException;
import com.codestates.server.exception.ExceptionCode;
import com.codestates.server.member.entity.Member;
import com.codestates.server.member.repository.MemberRepository;
import com.codestates.server.project.entity.Project;
import com.codestates.server.project.repository.ProjectRepository;
import com.codestates.server.project.service.ProjectService;
import com.codestates.server.projectLike.dto.ProjectLikeDto;
import com.codestates.server.projectLike.entity.ProjectLike;
import com.codestates.server.projectLike.repository.ProjectLikeRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@RequiredArgsConstructor
@Service
public class ProjectLikeService {
    private final ProjectLikeRepository projectLikeRepository;
    private final MemberRepository memberRepository;
    private final ProjectRepository projectRepository;

    public void addLikeProject(ProjectLikeDto projectLikeDto){

        Project project = getProject(projectLikeDto);


        if(existLike(projectLikeDto)) {
            ProjectLike projectLike = getProjectLike(projectLikeDto);
            project.removeProjectLike(projectLike);
            projectLikeRepository.delete(projectLike);
            project.setLikedProject(0);
            projectRepository.save(project);
        }else{
            ProjectLike projectLike = new ProjectLike();
            projectLike.setProject(getProject(projectLikeDto));
            projectLike.setMember(getMember(projectLikeDto));
            project.addProjectLike(projectLike);
            project.setLikedProject(1);
            projectLikeRepository.save(projectLike);
            projectRepository.save(project);
        }
    }





    private ProjectLike getProjectLike(ProjectLikeDto projectLikeDto) {
        return projectLikeRepository.findByMemberAndProject(getMember(projectLikeDto), getProject(projectLikeDto))
                .orElseThrow(() -> new BusinessLogicException(ExceptionCode.PROJECT_LIKE_NOT_FOUND));
    }

    private boolean existLike(ProjectLikeDto projectLikeDto) {
        return projectLikeRepository.findByMemberAndProject(getMember(projectLikeDto), getProject(projectLikeDto)).isPresent();
    }

    private Member getMember(ProjectLikeDto projectLikeDto) {
        return memberRepository.findById(projectLikeDto.getMemberId()).orElseThrow(
                () -> new BusinessLogicException(ExceptionCode.MEMBER_NOT_FOUND));
    }

    private Project getProject(ProjectLikeDto projectLikeDto) {
        return projectRepository.findById(projectLikeDto.getProjectId()).orElseThrow(
                () -> new BusinessLogicException(ExceptionCode.PROJECT_NOT_FOUND));
    }

//    public List<ProjectLike> findByMemberId(long memberId){
//        return projectLikeRepository.findProjectLikeByMemberId(memberId);
//    }
}
