package rw.qt.userms.models.dtos;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotNull;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.hibernate.validator.constraints.Length;
import rw.qt.userms.models.enums.EGender;

import javax.validation.constraints.NotBlank;
import java.util.UUID;

@AllArgsConstructor
@Getter
@Setter
@NoArgsConstructor
public class UpdateUserDTO {

    @Email
    @NotBlank
    private String emailAddress;

    @NotNull
    @Length(min = 5)
    private String serviceNumber;

    @NotBlank
    private String firstName;

    @NotBlank
    private String lastName;

    @NotNull
    private EGender gender;

    @NotBlank
    private String phoneNumber;

    private UUID centerId;

}
