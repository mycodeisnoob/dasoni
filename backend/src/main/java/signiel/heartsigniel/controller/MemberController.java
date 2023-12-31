package signiel.heartsigniel.controller;

import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;
import signiel.heartsigniel.common.code.CommonCode;
import signiel.heartsigniel.common.dto.Response;
import signiel.heartsigniel.model.meeting.dto.MatchingHistoryRequest;
import signiel.heartsigniel.model.member.*;
import signiel.heartsigniel.model.member.dto.MemberUpdateDto;
import signiel.heartsigniel.model.member.dto.SignRequest;
import signiel.heartsigniel.model.member.dto.SignResponse;
import signiel.heartsigniel.model.meeting.RatingService;

@RestController
@Slf4j
public class MemberController {
    private final MemberService memberService;
    private final RatingService ratingService;

    private final ImageService imageService;
    public MemberController(MemberService memberService, RatingService ratingService, ImageService imageService){
        this.memberService = memberService;
        this.ratingService = ratingService;
        this.imageService = imageService;
    }

    @PostMapping("/api/login")
    public ResponseEntity<SignResponse> signin(@RequestBody SignRequest request) {
        return new ResponseEntity<>(memberService.login(request), HttpStatus.OK);
    }


    @PostMapping("/api/register")
    public ResponseEntity<Boolean> signup(@RequestBody SignRequest request) throws Exception {
        return new ResponseEntity<>(memberService.register(request), HttpStatus.OK);
    }

    @PostMapping("/api/register/{loginId}")
    public ResponseEntity<String> checkMember(@PathVariable String loginId) {
        return new ResponseEntity<>(memberService.checkDuplicateId(loginId), HttpStatus.OK);
    }

    @GetMapping("/api/users/{memberId}")
    public ResponseEntity<SignResponse> getMember(@PathVariable Long memberId) {
        return new ResponseEntity<>(memberService.memberInfo(memberId), HttpStatus.OK);
    }

    @DeleteMapping("/api/users/{memberId}")
    public ResponseEntity<String> deleteMember(@PathVariable Long memberId) {
        return new ResponseEntity<>(memberService.deleteUserInfo(memberId), HttpStatus.OK);
    }

    @PatchMapping("/api/users/{memberId}")
    public ResponseEntity<String> updateMember(@PathVariable Long memberId, @RequestPart(value="key", required = true) MemberUpdateDto
            memberUpdateDto, @RequestPart(value = "file", required = false) MultipartFile file) {
        return new ResponseEntity<>(memberService.updateMember(memberId, memberUpdateDto, file), HttpStatus.OK);
    }

    @PatchMapping("/api/users/{memberId}/password")
    public ResponseEntity<String> patchMemberPW(@PathVariable Long memberId, @RequestBody SignRequest request) {
        return new ResponseEntity<>(memberService.patchMemberPW(memberId, request), HttpStatus.OK);
    }

    @PostMapping("/api/users/{memberId}/password")
    public ResponseEntity<Boolean> checkMemberPW(@PathVariable Long memberId, @RequestBody SignRequest request) {
        return new ResponseEntity<>(memberService.checkMemberPW(memberId, request), HttpStatus.OK);
    }

    @GetMapping("/api/users/{memberId}/history")
    public ResponseEntity<Response> getMatchingHistory(@PathVariable Long memberId){
        Response response = Response.of(CommonCode.GOOD_REQUEST, ratingService.getMatchedMemberIds(memberId));
        return ResponseEntity.ok(response);
    }

    @DeleteMapping("/api/users/{memberId}/history")
    public ResponseEntity<Response> deleteMatchingHistory(@PathVariable Long memberId, @RequestBody MatchingHistoryRequest matchingHistoryRequest){
        ratingService.deleteMatchingHistory(memberId, matchingHistoryRequest);
        Response response = Response.of(CommonCode.GOOD_REQUEST, null);
        return ResponseEntity.ok(response);
    }

    @PostMapping("/api/users/{memberId}/image")
    @ResponseStatus(HttpStatus.OK)
    public String saveImage(@PathVariable Long memberId, @ModelAttribute MultipartFile image){

//        return imageService.saveImage(image);
        return memberService.updateProfileImage(memberId,image);
    }

    @GetMapping("/api/members/{memberId}")
    public ResponseEntity<Response> getMemberMeetingInfo(@PathVariable Long memberId){
        Response response = memberService.getMemberLifeAndMeetingCount(memberId);
        return ResponseEntity.ok(response);
    }

    // S3에 저장된 이미지 삭제 로직, 이미지 파일의 확장자까지 정확하게 입력해야 삭제 가능
    // S3에 저장되지 않은 이미지 파일의 이름으로 요청하여도 오류 발생 X
    // test용으로 requestParam으로 함 ( 나중엔 member 테이블에서 받아오기 )
    @DeleteMapping("/api/image")
    @ResponseStatus(HttpStatus.OK)
    public void deleteImage(@RequestParam("fileName") String fileName){
        imageService.deleteImage(fileName);
    }
}