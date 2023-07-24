package com.codestates.server.project.service;//package com.codestates.server.project.service;

import com.codestates.server.exception.BusinessLogicException;
import com.codestates.server.exception.ExceptionCode;
import com.codestates.server.member.service.MemberService;
import com.codestates.server.project.dto.ProjectDto;
import com.codestates.server.project.entity.Project;
import com.codestates.server.project.mapper.ProjectMapper;
import com.codestates.server.project.repository.ProjectRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import javax.servlet.http.Cookie;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.time.LocalDateTime;
import java.time.temporal.ChronoUnit;
import java.util.List;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class ProjectService {

//    private final static String VIEWCOOKIENAME = "alreadyViewCookie";
    private final ProjectRepository projectRepository;
    private final ProjectMapper mapper;


    public Project createProject(Project project){
        project.setExpiredDate(LocalDateTime.now().plusDays(project.getEndDay()));
        return projectRepository.save(project);
    }

    public Project updateProject(Project project) {
        Project findProject = findProject(project.getProjectId());

        if(findProject.getCurrentAmount() > 0){
            throw new BusinessLogicException(ExceptionCode.PROJECT_CANT_MODIFY);
        }

        Optional.ofNullable(project.getContent())
                .ifPresent(content -> findProject.setContent(content));
        Optional.ofNullable(project.getSummary())
                .ifPresent(summary -> findProject.setSummary(summary));
        Optional.ofNullable(project.getTitle())
                .ifPresent(title -> findProject.setTitle(title));
        Optional.ofNullable(project.getTargetAmount())
                .ifPresent(targetAmount -> findProject.setTargetAmount(targetAmount));
        Optional.ofNullable(project.getEndDay())
                .ifPresent(endDay -> findProject.setEndDay(endDay));
        Optional.ofNullable(project.getEndDay())
                .ifPresent(endDay -> findProject.setExpiredDate(findProject.getCreatedAt().plusDays(endDay)));
        Optional.ofNullable(project.getImageUrl())
                .ifPresent(imageUrl -> findProject.setImageUrl(imageUrl));
        Optional.ofNullable(project.getPrice())
                .ifPresent(price -> findProject.setPrice(price));
        Optional.ofNullable(project.getLocation())
                .ifPresent(location -> findProject.setLocation(location));

        Project savedProject = projectRepository.save(findProject);

        return savedProject;
    }

    public Project findProject(long projectId){
        return findVerifiedProject(projectId);
    }

    public List<Project> findProjects(){
        return projectRepository.findAll(Sort.by(Sort.Direction.DESC,"projectId"));
    }

    public List<ProjectDto.Response> findByMemberId(long memberId){

        return  mapper.projectsToProjectResponseDtos(projectRepository.findByMemberId(memberId));
    }

    private Project findVerifiedProject(long projectId) {
        Project findProject = projectRepository.findById(projectId).orElseThrow(() ->
                new BusinessLogicException(ExceptionCode.PROJECT_NOT_FOUND));
        return findProject;
    }

    public List<ProjectDto.Response> findByCategoryType(long categoryId){
        return mapper.projectsToProjectResponseDtos(projectRepository.findByCategoryType(categoryId));
    }

    public List<ProjectDto.Response> findByLikedProject(long memberId){
        return mapper.projectsToProjectResponseDtos(projectRepository.findByLikedProject(memberId,1));
    }

    public List<Project> searchByKeyword(String keyword){
        return projectRepository.findByTitleContaining(keyword);
    }

    public void deleteProject(long projectId){
        if(findProject(projectId).getCurrentAmount() > 0){
            throw new BusinessLogicException(ExceptionCode.PROJECT_CANT_DELETE);
        }
        projectRepository.delete(findProject(projectId));
    }

    @Transactional
    public void updateView(long projectId) {


        projectRepository.updateView(projectId);
//        Cookie[] cookies = request.getCookies();
//        boolean checkCookie = false;
//        int result = 0;
//        if(cookies != null){
//            for (Cookie cookie : cookies)
//            {
//                // 이미 조회를 한 경우 체크
//                if (cookie.getName().equals(VIEWCOOKIENAME+projectId)) checkCookie = true;
//
//            }
//            if(!checkCookie){
//                Cookie newCookie = createCookie(projectId);
//                response.addCookie(newCookie);
//                result = projectRepository.updateView(projectId);
//            }
//        } else {
//            Cookie newCookie = createCookie(projectId);
//            response.addCookie(newCookie);
//            result = projectRepository.updateView(projectId);
//        }
//        return result;
    }


    /*
     * 조회수 중복 방지를 위한 쿠키 생성 메소드
     * @param cookie
     * @return
     * */
//    private Cookie createCookie(Long postId) {
//        Cookie cookie = new Cookie(VIEWCOOKIENAME+postId, String.valueOf(postId));
//        cookie.setComment("조회수 중복 증가 방지 쿠키");	// 쿠키 용도 설명 기재
//        cookie.setMaxAge(getRemainSecondForTommorow()); 	// 하루를 준다.
//        cookie.setHttpOnly(true);				// 서버에서만 조작 가능
//        return cookie;
//    }

    // 다음 날 정각까지 남은 시간(초)
//    private int getRemainSecondForTommorow() {
//        LocalDateTime now = LocalDateTime.now();
//        LocalDateTime tommorow = LocalDateTime.now().plusDays(1L).truncatedTo(ChronoUnit.DAYS);
//        return (int) now.until(tommorow, ChronoUnit.SECONDS);
//    }
    public void save(Project project){
        projectRepository.save(project);
    }


}
