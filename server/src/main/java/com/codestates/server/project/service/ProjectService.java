package com.codestates.server.project.service;//package com.codestates.server.project.service;


import com.codestates.server.exception.BusinessLogicException;
import com.codestates.server.exception.ExceptionCode;
import com.codestates.server.project.dto.ProjectDto;
import com.codestates.server.project.entity.Project;
import com.codestates.server.project.mapper.ProjectMapper;
import com.codestates.server.project.repository.ProjectRepository;
import com.codestates.server.projectLike.entity.ProjectLike;
import com.codestates.server.projectLike.repository.ProjectLikeRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.boot.json.BasicJsonParser;
import org.springframework.boot.json.JsonParser;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;


import javax.servlet.http.HttpServletRequest;
import java.time.LocalDateTime;
import java.util.Base64;
import java.util.List;
import java.util.Map;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class ProjectService {

//    private final static String VIEWCOOKIENAME = "alreadyViewCookie";
    private final ProjectRepository projectRepository;
    private final ProjectMapper mapper;
    private final ProjectLikeRepository projectLikeRepository;


    public Project createProject(Project project){
        project.setExpiredDate(LocalDateTime.now().plusDays(project.getEndDay()));
        return projectRepository.save(project);
    }

    public Project updateProject(Project project) {
        Project findProject = findVerifiedProject(project.getProjectId());

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
        Optional.ofNullable(project.getX())
                .ifPresent(x -> findProject.setX(x));
        Optional.ofNullable(project.getY())
                .ifPresent(y -> findProject.setY(y));
        Optional.ofNullable(project.getTags())
                .ifPresent(tags -> findProject.setTags(tags));


        Project savedProject = projectRepository.save(findProject);

        return savedProject;
    }

    public ProjectDto.Response findProject(long projectId,HttpServletRequest request){
        if(request.getHeader("Authorization") != null){
            String jws = request.getHeader("Authorization").replace("Bearer ","");
            String strMemberId = getMemberId(jws);
            long memberId = Long.parseLong(strMemberId);
            ProjectDto.Response findProject = mapper.projectToProjectResponseDto(findVerifiedProject(projectId));
            List<ProjectLike> projectLikes = projectLikeRepository.findByProjectId(projectId);
            findProject.setLikeCount(projectLikes.size());
            if(projectLikeRepository.findByMemberIdAndProjectId(projectId,memberId).isPresent()){
                findProject.setLikedProject(1);
            }

            return findProject;
        }

        ProjectDto.Response findProject = mapper.projectToProjectResponseDto(findVerifiedProject(projectId));
        List<ProjectLike> projectLikes = projectLikeRepository.findByProjectId(projectId);
        findProject.setLikeCount(projectLikes.size());

        return findProject;
    }


    public List<ProjectDto.Response> findProjects(HttpServletRequest request){

        if(request.getHeader("Authorization") != null){
            String jws = request.getHeader("Authorization").replace("Bearer ","");
            String strMemberId = getMemberId(jws);
            long memberId = Long.parseLong(strMemberId);
            List<Project> findProjects = projectRepository.findAll();
            List<ProjectLike> projectLikes = projectLikeRepository.findByMemberId(memberId);
            setLikedProject(findProjects,projectLikes);

            return mapper.projectsToProjectResponseDtos(findProjects);
        }

        return mapper.projectsToProjectResponseDtos(projectRepository.findAll());
    }

//    public List<ProjectDto.Response> findProjects(){
//        return mapper.projectsToProjectResponseDtos(projectRepository.findAll());
//    }

//    public List<ProjectDto.Response> findByCategoryType(long categoryId){
//        return mapper.projectsToProjectResponseDtos(projectRepository.findByCategoryType(categoryId));
//    }
    public List<ProjectDto.Response> findByLoginCategoryType(long categoryId,HttpServletRequest request){

        if(request.getHeader("Authorization") != null){
            String jws = request.getHeader("Authorization").replace("Bearer ","");
            String strMemberId = getMemberId(jws);
            long memberId = Long.parseLong(strMemberId);
            List<Project> findProjects = projectRepository.findByCategoryType(categoryId);
            List<ProjectLike> projectLikes = projectLikeRepository.findByMemberId(memberId);
            setLikedProject(findProjects, projectLikes);

            return mapper.projectsToProjectResponseDtos(findProjects);
        }
        return mapper.projectsToProjectResponseDtos(projectRepository.findByCategoryType(categoryId));
    }

    private static void setLikedProject(List<Project> findProjects, List<ProjectLike> projectLikes) {
        for(Project project: findProjects){
            for (ProjectLike projectLike: projectLikes){
                if(project.getProjectId() == projectLike.getProject().getProjectId()){
                    project.setLikedProject(1);
                }
            }
        }
    }

    public List<ProjectDto.Response> findByMemberId(long memberId){

        return  mapper.projectsToProjectResponseDtos(projectRepository.findByMemberId(memberId));
    }

    public Project findVerifiedProject(long projectId) {
        Project findProject = projectRepository.findById(projectId).orElseThrow(() ->
                new BusinessLogicException(ExceptionCode.PROJECT_NOT_FOUND));
        return findProject;
    }

    public List<ProjectDto.Response> findByLikedProject(long memberId){

        return mapper.projectsToProjectResponseDtos(projectRepository.findByLikedProject(memberId));
    }

    public List<ProjectDto.Response> searchByKeyword(String keyword){
        return mapper.projectsToProjectResponseDtos(projectRepository.findByTitleContaining(keyword));
    }
    public List<ProjectDto.Response> findByFundingMemberId(long memberId){
        return mapper.projectsToProjectResponseDtos(projectRepository.findByFundingMemberId(memberId));
    }

    public void deleteProject(long projectId){
        if(findVerifiedProject(projectId).getCurrentAmount() > 0){
            throw new BusinessLogicException(ExceptionCode.PROJECT_CANT_DELETE);
        }
        projectRepository.delete(findVerifiedProject(projectId));
    }

    private String getMemberId(final String accessToken){
        final String payloadJWT = accessToken.split("\\.")[1];
        Base64.Decoder decoder = Base64.getUrlDecoder();

        final String payload = new String(decoder.decode(payloadJWT));
        JsonParser jsonParser = new BasicJsonParser();
        Map<String,Object> jsonArray = jsonParser.parseMap(payload);

        if(!jsonArray.containsKey("memberId")){
            throw new BusinessLogicException(ExceptionCode.TOKEN_NOT_VALID);
        }
        return jsonArray.get("memberId").toString();
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
